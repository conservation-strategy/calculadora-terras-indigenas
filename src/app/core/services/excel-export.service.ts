import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import sheetConfig from '../../../assets/json/excel-export-config.json';
import sheetConfigNaoRecorrente from '../../../assets/json/excel-export-config-nao-recorrente.json';
import { TipoCusto } from '../../shared/enums';

interface CostItem {
  tipo: string;
  item: string;
  valor: number;
  unidade: string;
}

interface ActivityConfig {
  name: string;
  costItems: CostItem[];
  costItemsBom?: CostItem[];
}

interface SheetConfig {
  sheetName: string;
  header: string;
  totalHeader: string;
  eixoId: number;
  activities: ActivityConfig[];
}

@Injectable({
  providedIn: 'root',
})
export class ExcelExportService {
  constructor() {}

  public exportXls(resultado: any, tipoResultadoBom: boolean, tipoCusto: number) {
    if (!this.validateResultadoData(resultado)) {
      console.error('Invalid resultado data for Excel export');
      return;
    }

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    const config = tipoCusto === TipoCusto.Recorrente ? sheetConfig : sheetConfigNaoRecorrente;

    config.forEach((sheetConfig: SheetConfig) => {
      const ws: XLSX.WorkSheet = this.createSheet(resultado, tipoResultadoBom, sheetConfig, tipoCusto);
      XLSX.utils.book_append_sheet(wb, ws, sheetConfig.sheetName);
    });

    const excelBuffer: any = XLSX.write(wb, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveAsExcelFile(excelBuffer, 'calculadora_terras_indigenas');
  }

  private createSheet(resultado: any, tipoResultadoBom: boolean, config: SheetConfig, tipoCusto: number): XLSX.WorkSheet {
    const data: any[][] = [];

    data.push([config.header]);
    data.push([]);

    if (resultado.terraIndigena) {
      data.push(['Terra Indígena:', resultado.terraIndigena]);
    }
    data.push(['Tipo de Resultado:', tipoResultadoBom ? 'Bom' : 'Básico']);
    data.push(['Data de Geração:', new Date().toLocaleDateString('pt-BR')]);
    data.push([]);

    data.push(['INSTRUÇÃO:']);
    data.push(['O usuário deve alterar as quantidades para alcançar o valor sugerido. O usuário pode editar também os valores unitários sugeridos']);
    data.push([]);

    data.push(['Objetivo de gestão', 'Item de Custo', 'Valor Unitário (R$)', 'Unidade de Medida', 'Quantidade', 'Valor Total (R$)']);

    const activitySubtotalRows: number[] = [];

    config.activities.forEach((activity, index) => {
      data.push([]);
      data.push([activity.name]);
      data.push([]);

      const activityStartRow = data.length + 1;

      activity.costItems.forEach((item) => {
        const currentRow = data.length + 1;
        const formula = `C${currentRow}*E${currentRow}${item.unidade === 'por mês' && tipoCusto === TipoCusto.Recorrente ? '*12' : ''}`;
        data.push([
          item.tipo,
          item.item,
          { t: 'n', v: item.valor, z: '#,##0' },
          item.unidade,
          1,
          { t: 'n', f: formula, z: '#,##0' }
        ]);
      });

      if (tipoResultadoBom && activity.costItemsBom) {
        activity.costItemsBom.forEach((item) => {
          const currentRow = data.length + 1;
          const formula = `C${currentRow}*E${currentRow}${item.unidade === 'por mês' && tipoCusto === TipoCusto.Recorrente ? '*12' : ''}`;
          data.push([
            item.tipo,
            item.item,
            { t: 'n', v: item.valor, z: '#,##0' },
            item.unidade,
            1,
            { t: 'n', f: formula, z: '#,##0' }
          ]);
        });
      }

      const activityEndRow = data.length;
      data.push([]);
      const subtotalRow = data.length + 1;
      activitySubtotalRows.push(subtotalRow);
      data.push(['', 'Total/ano da Atividade', '', '', '', { t: 'n', f: `SUM(F${activityStartRow}:F${activityEndRow})`, z: '#,##0' }]);

      const calculatedValue = this.getActivityCalculatedValue(
        resultado,
        activity.name,
        config.eixoId
      );
      data.push(['', 'Total/ano sugerido', '', '', '', { t: 'n', v: Math.round(calculatedValue), z: '#,##0' }]);

      if (index < config.activities.length - 1) {
        data.push([]);
        data.push(['', '---', '---', '---', '---', '---']);
      }
    });

    data.push([]);
    data.push(['', '---', '---', '---', '---', '---']);
    data.push([]);
    const totalFormula = activitySubtotalRows.map(row => `F${row}`).join('+');
    data.push(['', config.totalHeader, '', '', '', { t: 'n', f: totalFormula, z: '#,##0' }]);

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);

    ws['!cols'] = [
      { wch: 20 },
      { wch: 60 },
      { wch: 20 },
      { wch: 20 },
      { wch: 15 },
      { wch: 20 },
    ];

    return ws;
  }

  private getActivityCalculatedValue(
    resultado: any,
    activityName: string,
    eixoId: number
  ): number {
    if (resultado?.eixos?.length) {
      const eixo = resultado.eixos.find((e: any) => e.id === eixoId);
      if (eixo) {
        const atividade = eixo.atividades.find(
          (a: any) => a.nome.trim().toLowerCase() === activityName.trim().toLowerCase()
        );
        if (atividade) {
          return atividade.valor;
        } else {
          console.warn(`Activity "${activityName}" not found in eixo "${eixo.nome}" (ID: ${eixoId})`);
        }
      } else {
        console.warn(`Eixo with ID ${eixoId} not found in resultado.`);
      }
    }
    return 0;
  }

  private validateResultadoData(resultado: any): boolean {
    return true;
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });
    saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + '.xlsx'
    );
  }
}
