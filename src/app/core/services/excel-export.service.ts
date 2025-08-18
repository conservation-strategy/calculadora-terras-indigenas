import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import sheetConfig from '../../../assets/json/excel-export-config.json';

interface SheetConfig {
  sheetName: string;
  header: string;
  eixoId: number;
  totalHeader: string;
  activities: {
    name: string;
    lookupName: string;
    items: {
      basico: CostItem[];
      bom?: CostItem[];
    };
  }[];
}

interface CostItem {
  tipo: string;
  item: string;
  valor: number;
  unidade: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExcelExportService {
  
  exportGovernancaRecorrente(resultado: any, tipoResultadoBom: boolean): void {
    try {
      if (!this.validateResultadoData(resultado)) {
        console.error('Invalid resultado data structure for Excel export');
        return;
      }

      const workbook = XLSX.utils.book_new();
      workbook.Props = {
        Title: 'Calculadora de Terras Indígenas - Análise de Custos',
        Subject: 'Análise de Custos por Eixo',
        Author: 'CSF - Calculadora de Terras Indígenas',
        CreatedDate: new Date()
      };
      
      (sheetConfig as SheetConfig[]).forEach(config => {
        const sheet = this.createSheet(resultado, tipoResultadoBom, config);
        XLSX.utils.book_append_sheet(workbook, sheet, config.sheetName);
      });

      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      
      const terraIndigena = resultado.terraIndigena || 'Terra_Indigena';
      const tipoCusto = tipoResultadoBom ? 'Bom' : 'Basico';
      const filename = `Gestao_${terraIndigena}_${tipoCusto}_${new Date().toISOString().split('T')[0]}.xlsx`;
      
      saveAs(blob, filename);
      
    } catch (error) {
      console.error('Error exporting Excel file:', error);
    }
  }

  private createSheet(resultado: any, tipoResultadoBom: boolean, config: SheetConfig): XLSX.WorkSheet {
    const data: any[] = [];
    
    // Header
    data.push([config.header]);
    data.push([]);
    
    // Metadata
    if (resultado.terraIndigena) {
      data.push(['Terra Indígena:', resultado.terraIndigena]);
    }
    data.push(['Tipo de Resultado:', tipoResultadoBom ? 'Bom' : 'Básico']);
    data.push(['Data de Geração:', new Date().toLocaleDateString('pt-BR')]);
    data.push([]);
    
    // Instruction
    data.push(['INSTRUÇÃO:']);
    data.push(['O usuário deve alterar as quantidades para alcançar o valor sugerido. O usuário pode editar também os valores unitários sugeridos.']);
    data.push([]);
    
    // Table Headers
    data.push(['Objetivo de gestão', 'Item de Custo', 'Valor Unitário (R$)', 'Unidade de Medida', 'Quantidade', 'Valor Total (R$)']);
    
    const subtotalRows: number[] = [];

    config.activities.forEach((activity: any, index: number) => {
      data.push([]);
      data.push([activity.name]);
      data.push([]);
      
      const activityStartRow = data.length + 1;
      
      activity.items.basico.forEach((item: CostItem) => {
        const currentRow = data.length + 1;
        const multiplyYear = item.unidade === 'por mês' ? '*12' : '';
        data.push([
          item.tipo, item.item, { t: 'n', v: item.valor, z: '#,##0' },
          item.unidade, { t: 'n', v: 1, z: '#,##0' },
          { t: 'n', f: `C${currentRow}*E${currentRow}${multiplyYear}`, z: '#,##0' }
        ]);
      });
      
      if (tipoResultadoBom && activity.items.bom) {
        activity.items.bom.forEach((item: CostItem) => {
          const currentRow = data.length + 1;
          const multiplyYear = item.unidade === 'por mês' ? '*12' : '';
          data.push([
            item.tipo, item.item, { t: 'n', v: item.valor, z: '#,##0' },
            item.unidade, { t: 'n', v: 1, z: '#,##0' },
            { t: 'n', f: `C${currentRow}*E${currentRow}${multiplyYear}`, z: '#,##0' }
          ]);
        });
      }
      
      const activityEndRow = data.length;
      data.push([]);
      const subtotalRow = data.length + 1;
      subtotalRows.push(subtotalRow);
      data.push(['', 'Total/ano da Atividade', '', '', '', { t: 'n', f: `SUM(F${activityStartRow}:F${activityEndRow})`, z: '#,##0' }]);
      const calculatedValue = this.getActivityCalculatedValue(resultado, activity.lookupName, config.eixoId);
      data.push(['', 'Total/ano sugerido', '', '', '', { t: 'n', v: Math.round(calculatedValue), z: '#,##0' }]);
      
      if (index < config.activities.length - 1) {
        data.push([]);
        data.push(['', '─', '─', '─', '─', '─']);
      }
    });
    
    // Final Total
    data.push([]);
    data.push(['', '─', '─', '─', '─', '─']);
    data.push([]);
    const totalFormula = subtotalRows.map(row => `F${row}`).join('+');
    data.push(['', config.totalHeader, '', '', '', { t: 'n', f: totalFormula, z: '#,##0' }]);

    const sheet = XLSX.utils.aoa_to_sheet(data);
    sheet['!cols'] = [
      { width: 12 }, { width: 45 }, { width: 18 }, { width: 20 }, { width: 12 }, { width: 18 }
    ];
    
    return sheet;
  }
  
  private getActivityCalculatedValue(resultado: any, activityName: string, eixoId: number): number {
    if (resultado?.eixos?.length) {
      const eixo = resultado.eixos.find((e: any) => e.id === eixoId);
      if (eixo?.atividades?.length) {
        const atividade = eixo.atividades.find((a: any) => {
          if (!a.nome) return false;
          const searchName = activityName.toLowerCase();
          const atividadeName = a.nome.toLowerCase();
          return atividadeName.includes(searchName) || searchName.includes(atividadeName);
        });
        if (atividade && typeof atividade.valor === 'number') {
          return atividade.valor;
        }
      }
    }
    console.warn(`Activity value not found for: ${activityName} in eixo ${eixoId}`);
    return 0;
  }
  
  private validateResultadoData(resultado: any): boolean {
    return resultado &&
           typeof resultado === 'object' &&
           resultado.terraIndigena &&
           Array.isArray(resultado.eixos);
  }
}
