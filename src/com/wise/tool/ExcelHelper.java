package com.wise.tool;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

/**
 * Excel读写工具类
 * 
 * @author zengzpi
 * 
 */
public class ExcelHelper {
	
	/**
	 * 只读模式
	 */
	public final static int OPEN_MODE_READ = 0;
	/**
	 * 只写模式
	 */
	public final static int OPEN_MODE_WRITE = 1;
	/**
	 * 读写模式（更新）
	 */
	public final static int OPEN_MODE_UPDATE = 2;
	private String filePath;
	private int mode = OPEN_MODE_READ;
	private Workbook workbook;
	private Sheet sheet;
	private boolean ooxml = false;
	private InputStream infile;
	private OutputStream outfile;
	private CellStyle style = null;
	private CellStyle head = null;
	private CellStyle datestyle = null;
	private Row row = null;
	private Cell cell = null;
	/**
	 * 打开Excel文件
	 * 
	 * @param filePath
	 * @param mode
	 * @return
	 */
	public boolean open(String filePath, int mode) {
		this.filePath = filePath;
		this.mode = mode;
		boolean success = openFile();
		return success;
	}

	/**
	 * 打开文件详细处理
	 * 
	 * @return
	 */
	private boolean openFile() {
		try {
			if (filePath.endsWith("xlsx")) {
				ooxml = true;
			}
			if (mode == OPEN_MODE_READ || mode == OPEN_MODE_UPDATE) {
				infile = new FileInputStream(new File(filePath));
				if (ooxml) {
					workbook = new XSSFWorkbook(infile);
				} else {
					workbook = new HSSFWorkbook(infile);
				}
				sheet = workbook.getSheetAt(0);
			} else {
				File out = new File(filePath);
				if(out.exists()) {
					out.delete();
				}
				outfile = new FileOutputStream(out);
				if (ooxml) {
					workbook = new XSSFWorkbook();
				} else {
					workbook = new HSSFWorkbook();
				}
				sheet = workbook.createSheet();
			}
			setupCellStyle();
			return true;
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return false;
	}
	
	/**
	 * 初始化创建几种单元格格式
	 */
	private void setupCellStyle() {
		if (mode != OPEN_MODE_WRITE && mode != OPEN_MODE_UPDATE) return;
		style = workbook.createCellStyle();
		style.setBorderBottom(CellStyle.BORDER_THIN);
		style.setBorderTop(CellStyle.BORDER_THIN);
		style.setBorderRight(CellStyle.BORDER_THIN);
		style.setBorderLeft(CellStyle.BORDER_THIN);
		head = workbook.createCellStyle();
		head.cloneStyleFrom(style);
		head.setAlignment(CellStyle.ALIGN_CENTER);
		datestyle = workbook.createCellStyle();
		datestyle.cloneStyleFrom(style);
		short fm = workbook.createDataFormat().getFormat("yyyy/mm/dd");
		datestyle.setDataFormat(fm);
	}

	/**
	 * 保存文件，自动关闭文件
	 * @param path 另存为路径
	 * 
	 * @return true： 成功
	 * 		   false：失败
	 */
	public boolean saveAs(File path) {
		if (mode == OPEN_MODE_READ) {
			return true;
		}

		try {
			// 先关闭输入流
			close();
			outfile = new FileOutputStream(path);
			workbook.write(outfile);
		} catch (Exception ex) {
			ex.printStackTrace();
			return false;
		}
		close();
		return true;
	}

	/**
	 * 保存文件，自动关闭文件
	 * 
	 * @return true： 成功
	 * 		   false：失败
	 */
	public boolean save() {
		if (mode == OPEN_MODE_READ) {
			return true;
		}

		if (mode == OPEN_MODE_UPDATE) {
			try {
				// 先关闭输入流
				close();
				outfile = new FileOutputStream(new File(filePath));
			} catch (Exception ex) {
				ex.printStackTrace();
				return false;
			}
		}
		try {
			workbook.write(outfile);
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
		close();
		return true;
	}

	/**
	 * 读取Excel文件
	 * 
	 * @return
	 */
	public List<String[]> read() {
		// Iterate through each rows one by one
		Iterator<Row> rowIterator = sheet.iterator();
		List<String[]> data = new ArrayList<String[]>();
		while (rowIterator.hasNext()) {
			Row row = rowIterator.next();
			List<String> rowData = new ArrayList<String>();
			// For each row, iterate through all the columns
			Iterator<Cell> cellIterator = row.cellIterator();

			while (cellIterator.hasNext()) {
				Cell cell = cellIterator.next();
				rowData.add(readCellValue(cell));
			}
			data.add(rowData.toArray(new String[0]));
		}
		return data;
	}
	
	/**
	 * 读取某几行，用于翻页显示数据
	 * 
	 * @param offset
	 *            0开始
	 * @param size
	 *            翻页大小 <=0 为所有数据读取
	 * @return
	 */
	public List<String[]> read(int offset, int size) {
		List<String[]> data = new ArrayList<String[]>();
		if (offset < 0) return data;
		int end = offset + size;
		if (size <= 0) end = countRow();
		for (int i = offset; i < end; i++) {
			String[] rowData = readLine(i);
			if (rowData == null)
				break;
			data.add(rowData);
		}
		return data;
	}
	
	/**
	 * 读取数据记录数
	 * @return
	 */
	public int countRow() {
		return sheet.getPhysicalNumberOfRows();
	}

	/**
	 * 读取单元格
	 * 
	 * @param cell
	 * @return
	 */
	private String readCellValue(Cell cell) {
		String value = null;
		// Check the cell type and format accordingly
		switch (cell.getCellType()) {
		case Cell.CELL_TYPE_NUMERIC:
			if (isDateCell(cell)) {
				value = getDateString(cell);
			} else {
				DataFormatter fmt = new DataFormatter();
				value = fmt.formatCellValue(cell);
			}
			break;
		case Cell.CELL_TYPE_STRING:
			value = cell.getStringCellValue();
			break;
		case Cell.CELL_TYPE_FORMULA:
			value = cell.getCellFormula();
			break;
		}
		return value == null ? "" : value;
	}
	
	/**
	 * 获取日期单元格字符串
	 * @param cell
	 * @return
	 */
	private String getDateString(Cell cell) {
		String value = "";
//		String dateFmt = cell.getCellStyle().getDataFormatString();
		Date val = cell.getDateCellValue();
		value= new SimpleDateFormat("yyyy-MM-dd").format(val);
//		if (dateFmt != null) {
//			value = new CellDateFormatter(dateFmt).format(val);
//			System.out.println("date format");
//		}
		return value;
	}
	
	/**
	 * 判断是否为日期单元格
	 * @param cell
	 * @return
	 */
	private boolean isDateCell(Cell cell) {
		return DateUtil.isCellDateFormatted(cell);
//		double val = cell.getNumericCellValue();
//		int intf = cell.getCellStyle().getDataFormat();
//		return DateUtil.isInternalDateFormat(intf);
//		if ( DateUtil.isValidExcelDate(val) ) {
//			
//			String dateFmt = cell.getCellStyle().getDataFormatString();
//			try {
//			value = new CellDateFormatter(dateFmt).format(val);
//			} catch(Exception e) {
//				
//			}
//		if (DateUtil.isCellDateFormatted(cell)) {
//			String dateFmt = cell.getCellStyle().getDataFormatString();
//			if (dateFmt != null) {
//				double val = cell.getNumericCellValue();
//				value = new CellDateFormatter(dateFmt).format(val);
//				System.out.println("date format");
//			}
//		return false;
	}

	/**
	 * 读取某一行
	 * 
	 * @param line
	 *            0开始
	 * @return
	 */
	public String[] readLine(int line) {
		Row row = sheet.getRow(line);
		if (row == null) return null;
		List<String> rowData = new ArrayList<String>();
		// For each row, iterate through all the columns
		Iterator<Cell> cellIterator = row.cellIterator();

		while (cellIterator.hasNext()) {
			Cell cell = cellIterator.next();
			rowData.add(readCellValue(cell));
		}
		return rowData.toArray(new String[0]);
	}

	/**
	 * 写入Exce数据
	 * 
	 * @param data
	 */
	public void Write(List<Object[]> data) {
		int rownum = 0;
		for (Object[] record : data) {
			WriteLine(rownum++, record);
		}
		if (data.isEmpty()) {
			return;
		}
		// 自动调整宽度；
		int column = data.get(0).length;
		for(int i=0; i<column; i++) {
			sheet.autoSizeColumn(i);
		}
	}
	public void autoSize(int column) {
		for(int i=0; i<column; i++) {
			sheet.autoSizeColumn(i);
		}
	}
	/**
	 * 写入某一行数据
	 * 
	 * @param line 从0开始
	 * @param data
	 */
	public void WriteLine(int line, Object[] data) {
		int cellnum = 0;
		row = sheet.createRow(line);
		for (Object obj : data) {
			cell = row.createCell(cellnum++);
			cell.setCellStyle(line == 0 ? head : style);
			setCellValue(cell, null==obj ? "" : obj.toString());
		}
	}

	/**
	 * 写入某一行数据
	 * 
	 * @param line   从0开始
	 * @param column 从0开始
	 * @param data
	 */
	public void WriteCell(int line, int column, Object data) {
		Cell cell = sheet.getRow(line).getCell(column);
		setCellValue(cell, data);
	}

	/**
	 * 写入某个单元格数据
	 * 
	 * @param cell
	 * @param obj
	 */
	private void setCellValue(Cell cell, Object obj) {
		if (obj instanceof Date) {
			cell.setCellValue((Date) obj);
			cell.setCellStyle(datestyle);
		} else if (obj instanceof Boolean) {
			cell.setCellValue((Boolean) obj);
		} else if (obj instanceof String) {
			cell.setCellValue((String) obj);
		} else if (obj instanceof Double) {
			cell.setCellValue((Double) obj);
		} else if (obj instanceof BigDecimal) {
			BigDecimal bd = (BigDecimal) obj;
			cell.setCellValue(bd.doubleValue());
		}
	}

	/**
	 * 关闭文件
	 */
	public void close() {
		if (infile != null) {
			try {
				infile.close();
				infile = null;
			} catch (IOException e) {
			}
		}
		if (outfile != null) {
			try {
				outfile.close();
				outfile = null;
			} catch (IOException e) {
			}
		}
	}
	
	/**
	 * 导出
	 * @param records 导出的数据
	 * @param heads   导出的表头
	 * @return
	 */
	@SuppressWarnings({"unchecked", "rawtypes"})
	public static File export(List records,List heads) {
		records.add(0, heads.toArray());  //将表头放在第一行
		// 保存文件路径
		String file = Utilities.rootPath() + "download/excel/" + 
				Utilities.createTimeStamp() + ".xlsx";
		// 输出Excel文件
		ExcelHelper excel = new ExcelHelper();
		if(!excel.open(file, ExcelHelper.OPEN_MODE_WRITE)) {
			System.out.println("打开Excel文件失败：" + file);
			return null;
		}
		excel.Write(records);
		if(!excel.save()) {
			System.out.println("保存Excel文件失败：" + file);
			return null;
		}
		return new File(file);
	
	}
	
	public static void downFile(List<String[]> dataList, List<String> heads,HttpServletResponse response) {
		InputStream inputStream = null;
        OutputStream output = null;
        try {
    		File file = export(dataList, heads);
            inputStream = new FileInputStream(file);
            output = response.getOutputStream();
            //设置下载文件弹出框的头部信息
            response.setHeader("Connection", "close");
            response.setHeader("Content-Type", "application/x-download");
    		response.setHeader("Content-disposition", "attachment;filename=" +Utilities.createTimeStamp()+".xlsx");
            byte[] buffer = new byte[1024];
            int i = 0;
            while ((i = inputStream.read(buffer)) != -1) {
                output.write(buffer, 0, i);
            }
        } catch (Exception e) {
        	e.printStackTrace();
        	
        } finally {
            try {
                if(null !=output) {
                    output.flush();
                    output.close();
                }
                if(null !=inputStream) {
                	inputStream.close();
                }
            } catch (Exception e) {
            	e.printStackTrace();
            }
        }
	}
}
