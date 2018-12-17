//
//  FileTools.m
//  iTablet
//
//  Created by Yang Shang Long on 2018/9/21.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "FileTools.h"

@implementation FileTools
RCT_EXPORT_MODULE();

RCT_REMAP_METHOD(zipFile, zipFileByPath:(NSString *)archivePath targetPath:(NSString *)targetPath resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  @try {
    BOOL result = [FileTools zipFile:archivePath targetPath:targetPath];
    
    resolve([NSNumber numberWithBool:result]);
  } @catch (NSException *exception) {
    reject(@"zipFile", exception.reason, nil);
  }
}

RCT_REMAP_METHOD(zipFiles, zipFilesByPaths:(NSArray *)archivePaths targetPath:(NSString *)targetPath resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  @try {
    BOOL result = [FileTools zipFiles:archivePaths targetPath:targetPath];
    
    resolve([NSNumber numberWithBool:result]);
  } @catch (NSException *exception) {
    reject(@"zipFile", exception.reason, nil);
  }
}

RCT_REMAP_METHOD(unZipFile, unZipFileByPath:(NSString *)archivePath targetPath:(NSString *)targetPath resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  @try {
    BOOL result = [FileTools unZipFile:archivePath targetPath:targetPath];
    
    resolve([NSNumber numberWithBool:result]);
  } @catch (NSException *exception) {
    reject(@"unZipFile", exception.reason, nil);
  }
}

RCT_REMAP_METHOD(deleteFile, deleteFileByPath:(NSString *)path resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  @try {
    BOOL result = NO;
    if (path != nil && ![path isEqualToString:@""]) {
      result = [FileTools deleteFile:path];
    }
    
    resolve([NSNumber numberWithBool:result]);
  } @catch (NSException *exception) {
    reject(@"unZipFile", exception.reason, nil);
  }
}

RCT_REMAP_METHOD(copyFile, copyFileByPath:(NSString *)fromPath targetPath:(NSString *)toPath override:(BOOL)override resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  @try {
    BOOL result = [[NSFileManager defaultManager] fileExistsAtPath:toPath];
    if (override || !result) {
      result = [FileTools copyFile:fromPath targetPath:toPath];
    }
    resolve([NSNumber numberWithBool:result]);
  } @catch (NSException *exception) {
    reject(@"unZipFile", exception.reason, nil);
  }
}

RCT_REMAP_METHOD(initUserDefaultData, initUserDefaultDataByUserName:(NSString *)userName resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  @try {
    BOOL result = [FileTools initUserDefaultData:userName];
    resolve([NSNumber numberWithBool:result]);
  } @catch (NSException *exception) {
    reject(@"unZipFile", exception.reason, nil);
  }
}

+(BOOL)zipFile:(NSString *)archivePath targetPath:(NSString *)targetPath {
  NSFileManager *fileManager = [NSFileManager defaultManager];
  BOOL isDir = NO;
  BOOL exist = [fileManager fileExistsAtPath:archivePath isDirectory:&isDir];
  BOOL result = NO;
  if (exist) {
    if (isDir) {
      result = [SSZipArchive createZipFileAtPath:targetPath withContentsOfDirectory:archivePath];
    } else {
      NSArray* filePaths = [NSArray arrayWithObjects:archivePath, nil];
      result = [SSZipArchive createZipFileAtPath:targetPath withFilesAtPaths:filePaths];
    }
  }
  return result;
}

+(BOOL)zipFiles:(NSArray *)archivePaths targetPath:(NSString *)targetPath {
  BOOL result = [SSZipArchive createZipFileAtPath:targetPath withFilesAtPaths:archivePaths];
  return result;
}

+(BOOL)unZipFile:(NSString *)archivePath targetPath:(NSString *)targetPath {
  BOOL result = NO;
  NSFileManager *fileManager = [NSFileManager defaultManager];
  BOOL isDir = NO;
  BOOL exist = [fileManager fileExistsAtPath:archivePath isDirectory:&isDir];
  
  if (exist){
    result = [SSZipArchive unzipFileAtPath:archivePath toDestination:targetPath];
  }
  return result;
}

+(BOOL)deleteFile:(NSString *)path {
  BOOL result = NO;
  if([[NSFileManager defaultManager] fileExistsAtPath:path isDirectory:nil]){
    result = [[NSFileManager defaultManager] removeItemAtPath:path error:nil];
  }
  return result;
}

+(BOOL)createFileDirectories:(NSString*)path
{
  
  // 判断存放音频、视频的文件夹是否存在，不存在则创建对应文件夹
  NSString* DOCUMENTS_FOLDER_AUDIO = path;
  NSFileManager *fileManager = [NSFileManager defaultManager];
  
  BOOL isDir = FALSE;
  BOOL isDirExist = [fileManager fileExistsAtPath:DOCUMENTS_FOLDER_AUDIO isDirectory:&isDir];
  
  
  if(!(isDirExist && isDir)){
    BOOL bCreateDir = [fileManager createDirectoryAtPath:DOCUMENTS_FOLDER_AUDIO withIntermediateDirectories:YES attributes:nil error:nil];
    
    if(!bCreateDir){
      
      NSLog(@"Create Directory Failed.");
      return NO;
    }else
    {
      //  NSLog(@"%@",DOCUMENTS_FOLDER_AUDIO);
      return YES;
    }
  }
  
  return YES;
}

+(BOOL)copyFile:(NSString *)fromPath targetPath:(NSString *)toPath {
  BOOL result = NO;
  if ([[NSFileManager defaultManager] fileExistsAtPath:fromPath]) {
    result = [[NSFileManager defaultManager] copyItemAtPath:fromPath toPath:toPath error:nil];
  }
  return result;
}

+(BOOL)initUserDefaultData:(NSString *)userName {
  userName = userName == nil || [userName isEqualToString:@""] ? @"Customer" : userName;
  
  // 初始化用户工作空间
  NSString* srclic = [[NSBundle mainBundle] pathForResource:@"Customer" ofType:@"smwu"];
  NSString* wsPath = [NSString stringWithFormat:@"%@%@%@", @"/Documents/iTablet/User/", userName, @"/Data/" ];
  [FileTools createFileDirectories:[NSHomeDirectory() stringByAppendingFormat:@"%@%@", wsPath, @""]];
  if (srclic) {
    NSString* deslic = [NSHomeDirectory() stringByAppendingFormat:@"%@%@%@", wsPath, @"Workspace", @".smwu"];
    if(![[NSFileManager defaultManager] fileExistsAtPath:deslic isDirectory:nil]){
      if(![[NSFileManager defaultManager] copyItemAtPath:srclic toPath:deslic error:nil])
        NSLog(@"拷贝数据失败");
    }
  }
  
  //创建用户目录
  NSString* commonPath = @"/Documents/iTablet/Common/";
  NSString* dataPath = [NSString stringWithFormat:@"%@%@%@", @"/Documents/iTablet/User/", userName, @"/Data/"];
  [FileTools createFileDirectories:[NSHomeDirectory() stringByAppendingFormat:@"%@%@", dataPath, @""]];
  [FileTools createFileDirectories:[NSHomeDirectory() stringByAppendingFormat:@"%@%@", commonPath, @""]];
  [FileTools createFileDirectories:[NSHomeDirectory() stringByAppendingFormat:@"%@%@", dataPath, @"Attribute"]];
  [FileTools createFileDirectories:[NSHomeDirectory() stringByAppendingFormat:@"%@%@", dataPath, @"Datasource"]];
  [FileTools createFileDirectories:[NSHomeDirectory() stringByAppendingFormat:@"%@%@", dataPath, @"Scene"]];
  [FileTools createFileDirectories:[NSHomeDirectory() stringByAppendingFormat:@"%@%@", dataPath, @"Symbol"]];
  [FileTools createFileDirectories:[NSHomeDirectory() stringByAppendingFormat:@"%@%@", dataPath, @"Template"]];
  [FileTools createFileDirectories:[NSHomeDirectory() stringByAppendingFormat:@"%@%@", dataPath, @"Workspace"]];
  [FileTools createFileDirectories:[NSHomeDirectory() stringByAppendingFormat:@"%@%@", dataPath, @"Temp"]];
  
  // 初始化模板数据
  NSString* originPath = [[NSBundle mainBundle] pathForResource:@"Template" ofType:@"zip"];
  NSString* commonZipPath = [NSHomeDirectory() stringByAppendingFormat:@"%@%@", commonPath, @"Template.zip"];
  NSString* templatePath = [NSHomeDirectory() stringByAppendingFormat:@"%@%@", dataPath, @"Template"];
  NSString* templateFilePath = [NSString stringWithFormat:@"%@/%@", templatePath, @"地理国情普查"];
  
  BOOL isUnZip = NO;
  if (![[NSFileManager defaultManager] fileExistsAtPath:templatePath isDirectory:nil] || ![[NSFileManager defaultManager] fileExistsAtPath:templateFilePath isDirectory:nil]) {
    if ([[NSFileManager defaultManager] fileExistsAtPath:commonZipPath isDirectory:nil]) {
      isUnZip = [FileTools unZipFile:commonZipPath targetPath:templatePath];
      NSLog(isUnZip ? @"解压数据成功" : @"解压数据失败");
    } else {
      if ([FileTools copyFile:originPath targetPath:commonZipPath]) {
        isUnZip = [FileTools unZipFile:commonZipPath targetPath:templatePath];
        NSLog(isUnZip ? @"解压数据成功" : @"解压数据失败");
      }
    }
  } else {
    isUnZip = YES;
  }
  
   NSString* sceneData = [NSHomeDirectory() stringByAppendingFormat:@"%@%@%@", @"/Documents/iTablet/User/", userName, @"/Data/Scene/OlympicGreen_ios.zip"];
   NSString* sceneDir = [NSHomeDirectory() stringByAppendingFormat:@"%@%@%@", @"/Documents/iTablet/User/", userName, @"/Data/Scene/"];
   NSString* srcSceneData = [[NSBundle mainBundle] pathForResource:@"OlympicGreen_ios" ofType:@"zip"];
  if (![[NSFileManager defaultManager] fileExistsAtPath:[NSHomeDirectory() stringByAppendingFormat:@"%@%@%@", @"/Documents/iTablet/User/", userName, @"/Data/Scene/OlympicGreen_ios"] isDirectory:nil]) {
      if ([FileTools copyFile:srcSceneData targetPath:sceneData]) {
        isUnZip = [FileTools unZipFile:sceneData targetPath:sceneDir];
        [FileTools deleteFile:sceneData];
        NSLog(isUnZip ? @"解压数据成功" : @"解压数据失败");
      }
  } else {
    isUnZip = YES;
  }
  
  return isUnZip;
}
@end