package com.wise.tool;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Properties;

import org.apache.commons.io.FileUtils;

import com.jfinal.core.Controller;
import com.jfinal.kit.Prop;
import com.jfinal.kit.PropKit;
import com.jfinal.upload.UploadFile;

public class FileUploader extends Controller{
	public void index(){
		Prop p=PropKit.use("SGConstants.properties");
		String add = getPara("add");
		
		String path = "";
		
		if(add != null){
			path = p.get(add);//FileUploader.getProperty(add);
		}else{
			path = p.get("ZILIANJIAN_UPLOADIMG_ADDRESS");//FileUploader.getProperty("ZILIANJIAN_UPLOADIMG_ADDRESS");
		}
		
		UploadFile upload = getFile("file");
		//String path = FileUploader.getProperty("ZILIANJIAN_UPLOADIMG_ADDRESS");
        String fileName = String.valueOf(System.currentTimeMillis());// 采用时间+UUID的方式随即命名
        String photoName = fileName + ".jpg"; // 保存在硬盘中的文件名
        boolean result=false;
        try {
			FileUtils.copyFile(upload.getFile(),new File(path+"\\"+photoName));
			result=true;
		} catch (IOException e) {
			e.printStackTrace();
		}
        
		renderJson("{msg:'"+result+"',filename:'"+photoName+"'}");
	}
	public void upImg(){
		UploadFile upload = getFile("file");
		String path = FileUploader.getProperty("ZILIANJIAN_UPLOADIMG_ADDRESS1");
        String fileName = String.valueOf(System.currentTimeMillis());// 采用时间+UUID的方式随即命名
        String photoName = fileName + ".jpg"; // 保存在硬盘中的文件名
        boolean result=false;
        try {
			FileUtils.copyFile(upload.getFile(),new File(path+"\\"+photoName));
			result=true;
		} catch (IOException e) {
			e.printStackTrace();
		}
        
		renderJson("{msg:'"+result+"',filename:'"+photoName+"'}");
	}
	public void upImg1(){
		UploadFile upload = getFile("file");
		String path = FileUploader.getProperty("ZILIANJIAN_UPLOADIMG_ADDRESS2");
        String fileName = String.valueOf(System.currentTimeMillis());// 采用时间+UUID的方式随即命名
        String photoName = fileName + ".jpg"; // 保存在硬盘中的文件名
        boolean result=false;
        try {
			FileUtils.copyFile(upload.getFile(),new File(path+"\\"+photoName));
			result=true;
		} catch (IOException e) {
			e.printStackTrace();
		}
        
		renderJson("{msg:'"+result+"',filename:'"+photoName+"'}");
	}
public static String getProperty(String key){
		
		// 返回初始化
		String returnStr = "";
		
		// 初始化
        Properties prop = new Properties();
        
        // 读取
        try {   
            // 读入配置文件
        	prop.load(new InputStreamReader(FileUploader.class.getClassLoader().getResourceAsStream("SGConstants.properties"), "UTF-8"));
            
        	// 返回读取的值
            returnStr = prop.getProperty(key).trim();
            
        // 报错
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        // 返回
        return returnStr;
    
		
	}
}
 