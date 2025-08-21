import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx-js-style';
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
    const labelStyle = { font: { italic: true, color: { rgb: '808080' } } };

    data.push([config.header]);
    data.push([]);

    if (resultado.terraIndigena) {
      data.push([{ v: 'Terra Indígena:', t: 's', s: labelStyle }, resultado.terraIndigena]);
    }
    data.push([{ v: 'Tipo de Resultado:', t: 's', s: labelStyle }, tipoResultadoBom ? 'Bom' : 'Básico']);
    data.push([{ v: 'Data de Geração:', t: 's', s: labelStyle }, new Date().toLocaleDateString('pt-BR')]);
    data.push([]);

    data.push([{ v: 'INSTRUÇÃO:', t: 's', s: labelStyle }]);
    data.push(['O usuário deve alterar as quantidades para alcançar o valor sugerido. O usuário pode editar também os valores unitários sugeridos']);
    data.push([]);

    const headers = [
      'Objetivo de gestão',
      'Item de Custo',
      'Valor Unitário (R$)',
      'Unidade de Medida',
      'Quantidade',
      'Valor Total (R$)',
    ];
    const headerStyle = {
      font: { bold: true, color: { rgb: 'ffffff' } },
      fill: { patternType: 'solid', fgColor: { rgb: 'c64c2f' } },
    };
    data.push(headers.map(h => ({ v: h, t: 's', s: headerStyle })));

    const activitySubtotalRows: number[] = [];
    const whiteFill = { patternType: 'solid', fgColor: { rgb: 'ffffff' } };
    const grayFill = { patternType: 'solid', fgColor: { rgb: 'f2f1f1' } };
    let dataRowCounter = 0;
    const boldStyle = { font: { bold: true } };

    config.activities.forEach((activity, index) => {
      data.push([]);
      data.push([{ v: activity.name, t: 's', s: boldStyle }]);
      data.push([]);

      const activityStartRow = data.length + 1;

      const processCostItem = (item: CostItem) => {
        const fill = dataRowCounter % 2 === 0 ? grayFill : whiteFill;
        const style = { fill };
        const currentRow = data.length + 1;
        const formula = `C${currentRow}*E${currentRow}${item.unidade === 'por mês' && tipoCusto === TipoCusto.Recorrente ? '*12' : ''}`;
        const rowData = [
          { v: item.tipo, t: 's', s: style },
          { v: item.item, t: 's', s: style },
          { t: 'n', v: item.valor, z: '#,##0', s: style },
          { v: item.unidade, t: 's', s: style },
          { t: 'n', v: 1, z: '#,##0', s: style },
          { t: 'n', f: formula, z: '#,##0', s: style }
        ];
        data.push(rowData);
        dataRowCounter++;
      };

      activity.costItems.forEach(processCostItem);

      if (tipoResultadoBom && activity.costItemsBom) {
        activity.costItemsBom.forEach(processCostItem);
      }

      const activityEndRow = data.length;
      data.push([]);
      const subtotalRow = data.length + 1;
      activitySubtotalRows.push(subtotalRow);
      data.push(['', { v: 'Total/ano da Atividade', t: 's', s: boldStyle }, '', '', '', { t: 'n', f: `SUM(F${activityStartRow}:F${activityEndRow})`, z: '#,##0', s: boldStyle }]);

      const calculatedValue = this.getActivityCalculatedValue(
        resultado,
        activity.name,
        config.eixoId
      );
      data.push(['', { v: 'Total/ano sugerido', t: 's', s: boldStyle }, '', '', '', { t: 'n', v: Math.round(calculatedValue), z: '#,##0', s: boldStyle }]);

      if (index < config.activities.length - 1) {
        data.push([]);
        // data.push(['', '---', '---', '---', '---', '---']);
      }
    });

    data.push([]);
    data.push(['', '---', '---', '---', '---', '---']);
    data.push([]);
    const totalFormula = activitySubtotalRows.map(row => `F${row}`).join('+');
    data.push(['', { v: config.totalHeader, t: 's', s: boldStyle }, '', '', '', { t: 'n', f: totalFormula, z: '#,##0', s: boldStyle }]);

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
