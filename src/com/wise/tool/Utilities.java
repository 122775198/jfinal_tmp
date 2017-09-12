package com.wise.tool;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Clob;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

public class Utilities {
	
	/**
	 * 数据库字段转换成String: Clob
	 * @param clb
	 * @return
	 */
	public static String dbObjectToString(Object value) {
		if (value == null) {
			return "";
		}
		if(value instanceof Clob) {
			Clob clb = (Clob)value;
			try {
				String str = clb.getSubString(1, (int) clb.length());
				return str;
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return value.toString();
	}
	
	public static String formatDate(Object date) {
		String value = "";
		try {
			value = new SimpleDateFormat("yyyy-MM-dd").format(date);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return value;
	}
	
	/**
	 * 创建时间戳字符串
	 * @return
	 */
	public static String createTimeStamp() {
		String value = "";
		try {
			Date date = new Date();
			value = new SimpleDateFormat("yyyyMMddHHmmssSSS").format(date);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return value; 
	}
	
	public static String formatDate(Object date, String format) {
		String value = "";
		try {
			value = new SimpleDateFormat(format).format(date);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return value;
	}

	/**
	 * 数据库Decimal转换成Int
	 * @param value
	 * @return
	 */
	public static int dbObjectToInt(Object value) {
		BigDecimal i = (BigDecimal)value;
		if(i != null) {
			return i.intValue();
		}
		return Integer.MIN_VALUE;
	}
	
	/**
	 * 从Request获取参数
	 * @param params request.getParameterMap();
	 * @param key
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static String parseParams(Map params, String key) {
		Object val = params.get(key);
		if (val == null) return null;
		if (val instanceof String) return (String)val;
		
		String[] result = (String[])params.get(key);
		if (result != null && result.length > 0) {
			return result[0];
		}
		return null;
	}
	
	/**
	 * 从Request获取参数
	 * @param params request.getParameterMap();
	 * @param key
	 * @return -1为异常
	 */
	@SuppressWarnings("rawtypes")
	public static int parseIntParams(Map params, String key) {
		int result = -1;
		String value = parseParams(params, key);
		if (value != null) {
			try {
				result = Integer.parseInt(value);
			} catch (NumberFormatException e) {
				e.printStackTrace();
			}
		}
		return result;
	}

	/**
	 * 取得WebApp根路径（结尾带文件分隔符）
	 * @return WebApp根路径
	 */
	public static String rootPath() {
		String path = "";
		path = Utilities.class.getProtectionDomain().getCodeSource().getLocation().getPath();
		
		int index = path.indexOf("WEB-INF");
		if (index >= 0) {
			path = path.substring(0, index);
		}
		try {
			path = new File(path).getCanonicalPath() + File.separator;
		} catch (IOException e) {
			return "";
		}
		return path;
	}
	
	/**
	 * 创建时间戳字符串
	 * @return
	 */
	public static String createSystemTime() {
		String value = "";
		try {
			Date date = new Date();
			value = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(date);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return value; 
	}
}
