import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export interface CostItem {
  tipo: 'Básico' | 'Bom';
  itemCusto: string;
  valorUnitario: number;
  unidadeMedida: string;
  quantidade: number;
  valorTotal: number;
}

export interface ActivityBreakdown {
  nome: string;
  items: CostItem[];
  totalCalculado: number;
}

@Injectable({
  providedIn: 'root'
})
export class ExcelExportService {
  
  exportGovernancaRecorrente(resultado: any, tipoResultadoBom: boolean): void {
    try {
      if (!resultado) {
        console.error('No resultado data provided for Excel export');
        return;
      }
      
      // Validate required data
      if (!this.validateResultadoData(resultado)) {
        console.error('Invalid resultado data structure for Excel export');
        return;
      }

      const workbook = XLSX.utils.book_new();
      
      // Add metadata
      workbook.Props = {
        Title: 'Calculadora de Terras Indígenas - Governança Recorrente',
        Subject: 'Análise de Custos por Eixo',
        Author: 'CSF - Calculadora de Terras Indígenas',
        CreatedDate: new Date()
      };
      
      // Create Governança Recorrente sheet
      const governancaSheet = this.createGovernancaRecorrenteSheet(resultado, tipoResultadoBom);
      XLSX.utils.book_append_sheet(workbook, governancaSheet, 'Recorrente - Governança');
      
      // Generate and download
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      
      // Create a more descriptive filename
      const terraIndigena = resultado.terraIndigena || 'Terra_Indigena';
      const tipoCusto = tipoResultadoBom ? 'Bom' : 'Basico';
      const filename = `Governanca_Recorrente_${terraIndigena}_${tipoCusto}_${new Date().toISOString().split('T')[0]}.xlsx`;
      
      saveAs(blob, filename);
      
      console.log('Excel file exported successfully:', filename);
    } catch (error) {
      console.error('Error exporting Excel file:', error);
      // You could add user notification here if needed
    }
  }
  
  private createGovernancaRecorrenteSheet(resultado: any, tipoResultadoBom: boolean): XLSX.WorkSheet {
    const data: any[] = [];
    
    // Header
    data.push(['RECORRENTE - GOVERNANÇA']);
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
    
    // Headers
    data.push(['Objetivo de gestão', 'Item de Custo', 'Valor Unitário (R$)', 'Unidade de Medida', 'Quantidade', 'Valor Total (R$)']);
    
    // --- Infraestrutura das associações ---
    data.push([]);
    data.push(['INFRAESTRUTURA DAS ASSOCIAÇÕES']);
    data.push([]);
    
    const infraestruturaBasico = [
      { tipo: 'Básico', item: 'Manutenção de equipamentos e veículos', valor: 2000, unidade: 'por evento' },
      { tipo: 'Básico', item: 'Licenças de softwares', valor: 1500, unidade: 'por ano' },
      { tipo: 'Básico', item: 'Reparos correntes da infraestrutura da associação', valor: 1000, unidade: 'unitário' }
    ];

    const infraStartRow = data.length + 1;
    infraestruturaBasico.forEach(item => {
      const currentRow = data.length + 1;
      const multiplyYear = item.unidade === 'por mês' ? '*12' : '';
      data.push([
        item.tipo,
        item.item,
        { t: 'n', v: item.valor, z: '#,##0' },
        item.unidade,
        { t: 'n', v: 1, z: '#,##0' },
        { t: 'n', f: `C${currentRow}*E${currentRow}${multiplyYear}`, z: '#,##0' }
      ]);
    });

    if (tipoResultadoBom) {
      const infraestruturaBom = [
        { tipo: 'Bom', item: 'Manutenção de equipamentos e veículos', valor: 2000, unidade: 'por evento' },
        { tipo: 'Bom', item: 'Manutenção elétrica', valor: 2000, unidade: 'por evento' },
        { tipo: 'Bom', item: 'Seguro dos veículos', valor: 5000, unidade: 'por mês' },
        { tipo: 'Bom', item: 'Sistema de monitoramento', valor: 8000, unidade: 'por sistema' },
        { tipo: 'Bom', item: 'Reparos correntes da infraestrutura da associação', valor: 1000, unidade: 'unitário' }
      ];
      infraestruturaBom.forEach(item => {
        const currentRow = data.length + 1;
        const multiplyYear = item.unidade === 'por mês' ? '*12' : '';
        data.push([
          item.tipo,
          item.item,
          { t: 'n', v: item.valor, z: '#,##0' },
          item.unidade,
          { t: 'n', v: 1, z: '#,##0' },
          { t: 'n', f: `C${currentRow}*E${currentRow}${multiplyYear}`, z: '#,##0' }
        ]);
      });
    }

    const infraEndRow = data.length;
    data.push([]);
    const infraSubtotalRow = data.length + 1;
    data.push(['', 'Total/ano da Atividade', '', '', '', {t:'n', f:`SUM(F${infraStartRow}:F${infraEndRow})`, z: '#,##0'}]);
    const infraCalculado = this.getActivityCalculatedValue(resultado, 'Infraestrutura das associações');
    data.push(['', 'Total/ano sugerido', '', '', '', {t:'n', v: Math.round(infraCalculado), z: '#,##0'}]);
    
    // Separator
    data.push([]);
    data.push(['', '─', '─', '─', '─', '─']);
    data.push([]);

    // --- Funcionamento das associações ---
    data.push(['FUNCIONAMENTO DAS ASSOCIAÇÕES']);
    data.push([]);
    
    const funcionamentoBasico = [
        { tipo: 'Básico', item: 'Tarifa bancária', valor: 1000, unidade: 'unitário' },
        { tipo: 'Básico', item: 'Internet', valor: 150, unidade: 'por mês' },
        { tipo: 'Básico', item: 'Energia', valor: 250, unidade: 'por mês' },
        { tipo: 'Básico', item: 'Água', valor: 120, unidade: 'por mês' },
        { tipo: 'Básico', item: 'Telefone', valor: 100, unidade: 'por mês' },
        { tipo: 'Básico', item: 'Correios', valor: 1000, unidade: 'unitário' },
        { tipo: 'Básico', item: 'Auditoria', valor: 1000, unidade: 'por serviço' },
        { tipo: 'Básico', item: 'Serviços contábeis', valor: 1000, unidade: 'unitário' },
        { tipo: 'Básico', item: 'Despesa com cartório', valor: 1000, unidade: 'por serviço' },
        { tipo: 'Básico', item: 'Material de escritório', valor: 800, unidade: 'por mês' },
        { tipo: 'Básico', item: 'Confecção de material gráfico', valor: 500, unidade: 'por tiragem' },
        { tipo: 'Básico', item: 'Impressões', valor: 1000, unidade: 'unitário' },
        { tipo: 'Básico', item: 'Passagens', valor: 1000, unidade: 'unitário' },
        { tipo: 'Básico', item: 'Alimentação', valor: 60, unidade: 'por dia' },
        { tipo: 'Básico', item: 'Hospedagem', valor: 200, unidade: 'por diária' },
        { tipo: 'Básico', item: 'Frete aéreo', valor: 3000, unidade: 'por operação' },
        { tipo: 'Básico', item: 'Aluguel de veículo', valor: 5000, unidade: 'por mês' },
        { tipo: 'Básico', item: 'Táxi', valor: 400, unidade: 'por dia' },
        { tipo: 'Básico', item: 'Transporte', valor: 5000, unidade: 'por mês' },
        { tipo: 'Básico', item: 'Combustível', valor: 1000, unidade: 'unitário' }
      ];

    const funcStartRow = data.length + 1;
    funcionamentoBasico.forEach(item => {
      const currentRow = data.length + 1;
      const multiplyYear = item.unidade === 'por mês' ? '*12' : '';
      data.push([
        item.tipo,
        item.item,
        { t: 'n', v: item.valor, z: '#,##0' },
        item.unidade,
        { t: 'n', v: 1, z: '#,##0' },
        { t: 'n', f: `C${currentRow}*E${currentRow}${multiplyYear}`, z: '#,##0' }
      ]);
    });

    if (tipoResultadoBom) {
        const funcionamentoBom = [
            { tipo: 'Bom', item: 'Assessoria de comunicação', valor: 7000, unidade: 'por mês' },
            { tipo: 'Bom', item: 'Assessoria jurídica', valor: 7000, unidade: 'por mês' },
            { tipo: 'Bom', item: 'Consultoria de audiovisual', valor: 7000, unidade: 'por mês' },
            { tipo: 'Bom', item: 'Advogado', valor: 1000, unidade: 'unitário' },
            { tipo: 'Bom', item: 'Assessoria de gestão de mídias', valor: 7000, unidade: 'por mês' },
            { tipo: 'Bom', item: 'Site', valor: 1000, unidade: 'por ano' },
            { tipo: 'Bom', item: 'Plano de comunicação', valor: 1000, unidade: 'unitário' }
          ];
      funcionamentoBom.forEach(item => {
        const currentRow = data.length + 1;
        const multiplyYear = item.unidade === 'por mês' ? '*12' : '';
        data.push([
            item.tipo,
            item.item,
            { t: 'n', v: item.valor, z: '#,##0' },
            item.unidade,
            { t: 'n', v: 1, z: '#,##0' },
            { t: 'n', f: `C${currentRow}*E${currentRow}${multiplyYear}`, z: '#,##0' }
        ]);
      });
    }

    const funcEndRow = data.length;
    data.push([]);
    const funcSubtotalRow = data.length + 1;
    data.push(['', 'Total/ano da Atividade', '', '', '', {t:'n', f:`SUM(F${funcStartRow}:F${funcEndRow})`, z: '#,##0'}]);
    const funcCalculado = this.getActivityCalculatedValue(resultado, 'Funcionamento das associações');
    data.push(['', 'Total/ano sugerido', '', '', '', {t:'n', v: Math.round(funcCalculado), z: '#,##0'}]);
    
    // --- Final Total ---
    data.push([]);
    data.push(['', '─', '─', '─', '─', '─']);
    data.push([]);
    data.push(['', 'TOTAL GERAL GOVERNANÇA', '', '', '', {t:'n', f:`F${infraSubtotalRow}+F${funcSubtotalRow}`, z: '#,##0'}]);

    // Create worksheet
    const sheet = XLSX.utils.aoa_to_sheet(data);
    
    // Set column widths
    sheet['!cols'] = [
      { width: 12 }, { width: 45 }, { width: 18 }, { width: 20 }, { width: 12 }, { width: 18 }
    ];
    
    this.applyBasicStyling(sheet, data.length);
    
    return sheet;
  }
  
  private getActivityCalculatedValue(resultado: any, activityName: string): number {
    // The calculator stores results in resultado.eixos where each eixo has activities
    if (resultado && resultado.eixos && Array.isArray(resultado.eixos)) {
      // Find the Governança eixo (id: 1)
      const governancaEixo = resultado.eixos.find((e: any) => e.id === 1);
      
      if (governancaEixo && governancaEixo.atividades && Array.isArray(governancaEixo.atividades)) {
        // Find the specific activity by name
        const atividade = governancaEixo.atividades.find((a: any) => {
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
    
    // If no match found, log for debugging
    console.warn(`Activity value not found for: ${activityName}`);
    return 0;
  }
  
  private validateResultadoData(resultado: any): boolean {
    // Basic validation of resultado structure
    if (!resultado || typeof resultado !== 'object') {
      return false;
    }
    
    // Check if required properties exist
    if (!resultado.terraIndigena || !resultado.eixos) {
      return false;
    }
    
    // Check if eixos is an array
    if (!Array.isArray(resultado.eixos)) {
      return false;
    }
    
    return true;
  }
  
  private applyBasicStyling(sheet: XLSX.WorkSheet, rowCount: number): void {
    // SheetJS has limited styling capabilities, but we can set some basic properties
    
    // Set column widths (already done in createGovernancaRecorrenteSheet)
    
    // Cell-level formatting is now applied directly during cell creation.
    
    // Add some basic range formatting hints
    // This is a placeholder for when we implement more advanced styling
  }
}
