package com.codegenerate.test.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
import org.springframework.format.annotation.DateTimeFormat;

/**   
 * @Title: Entity
 * @Description: 测试练习表
 * @author JiangBo
 *
 */
@Entity
@Table(name = "IB_TEST")
public class TestEntity implements java.io.Serializable {
    private static final long serialVersionUID = 0L;
	/**id*/
	private java.lang.String id;
	/**name*/
	private java.lang.String name;
	/**remark*/
	private java.lang.String remark;
	/**eventtime*/
	private java.sql.Timestamp eventtime;
	
	/**
	 *方法: 取得java.lang.String
	 *@return: java.lang.String  id
	 */
	
	@Id
	@GeneratedValue(generator = "paymentableGenerator")
	@GenericGenerator(name = "paymentableGenerator", strategy = "uuid")
	@Column(name ="ID",nullable=false,length=64)
	public java.lang.String getId(){
		return this.id;
	}

	/**
	 *方法: 设置java.lang.String
	 *@param: java.lang.String  id
	 */
	public void setId(java.lang.String id){
		this.id = id;
	}
	/**
	 *方法: 取得java.lang.String
	 *@return: java.lang.String  name
	 */
	@Column(name ="NAME",nullable=true,length=64)
	public java.lang.String getName(){
		return this.name;
	}

	/**
	 *方法: 设置java.lang.String
	 *@param: java.lang.String  name
	 */
	public void setName(java.lang.String name){
		this.name = name;
	}
	/**
	 *方法: 取得java.lang.String
	 *@return: java.lang.String  remark
	 */
	@Column(name ="REMARK",nullable=true,length=1024)
	public java.lang.String getRemark(){
		return this.remark;
	}

	/**
	 *方法: 设置java.lang.String
	 *@param: java.lang.String  remark
	 */
	public void setRemark(java.lang.String remark){
		this.remark = remark;
	}
	/**
	 *方法: 取得java.sql.Timestamp
	 *@return: java.sql.Timestamp  eventtime
	 */
	@Column(name ="EVENTTIME",nullable=true)
	public java.sql.Timestamp getEventtime(){
		return this.eventtime;
	}

	/**
	 *方法: 设置java.sql.Timestamp
	 *@param: java.sql.Timestamp  eventtime
	 */
	public void setEventtime(java.sql.Timestamp eventtime){
		this.eventtime = eventtime;
	}
}
