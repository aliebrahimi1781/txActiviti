package com.tx.table.dao;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

import javax.sql.DataSource;

import org.apache.log4j.Logger;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.ParameterizedBeanPropertyRowMapper;
import org.springframework.transaction.annotation.Transactional;

import com.tx.table.domain.ConfTableInfo;

/**
 * 流水表表结构管理DAO
 */
@Transactional
public class TableDao {
	/**
	 * JdbcTemplate
	 */
	private JdbcTemplate jdbcTemplate;
	/**
     * log4j
     */
    private Logger logger = Logger.getLogger(TableDao.class);
	
    /**
     * 流水表结构管理表List
     * 
     * @param sql
     * @return
     */
    public List<ConfTableInfo> queryConfFlowTableManageList(String sql) {
       try{
           return jdbcTemplate.query(sql, ParameterizedBeanPropertyRowMapper.newInstance(ConfTableInfo.class));
           }catch (Exception e){
           return null;
       }
    }
//    /**
//     * 统计表结构管理表List
//     * 
//     * @param sql
//     * @return
//     */
//    public List<ConfReportTableManage> queryConfReportTableManageList(String sql) {
//       try{
//           return jdbcTemplate.query(sql, ParameterizedBeanPropertyRowMapper.newInstance(ConfReportTableManage.class));
//           }catch (Exception e){
//           return null;
//       }
//    }
//    /**
//     * 取得统计表SQL文信息
//     * @param sql
//     * @return
//     */
//    public List<ConfReportSQLManage> queryReportSqlManage(String sql) {
//        try{
//            return jdbcTemplate.query(sql, ParameterizedBeanPropertyRowMapper.newInstance(ConfReportSQLManage.class));
//            }catch (Exception e){
//            return null;
//        }
//    }
//    /**
//     * 批量插入流水表表结构管理表
//     * @param list
//     * @param sql
//     */
//    public int batchInsertFlowTableManage(final List<ConfFlowTableManage> list, String sql) {
//        try{
//            jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
//               @Override
//               public int getBatchSize() {
//                return list.size();    //这个方法设定更新记录数，通常List里面存放的都是我们要更新的，所以返回list.size()；
//               }
//                @Override
//                public void setValues(PreparedStatement ps, int i)
//                        throws SQLException {
//                    ConfFlowTableManage bean = list.get(i);
//                    ps.setString(SQL_1, bean.getTableName());
//                    ps.setString(SQL_2, bean.getTableNameComment());
//                    ps.setInt(SQL_3, bean.getColumnNo());
//                    ps.setString(SQL_4, bean.getColumnValue());
//                    ps.setString(SQL_5, bean.getColumnName());
//                    ps.setString(SQL_6, bean.getTypeKey());
//                    ps.setString(SQL_7, bean.getTypeValue());
//                }
//            });
//            return 1;
//        }catch (Exception e){
//            logger.error("==========批量插入流水表表结构管理表 Exception:" + e.toString());
//            return 0;
//        }
//    }
//    /**
//     * 批量插入统计表表结构管理表
//     * @param list
//     * @param sql
//     */
//    public int batchInsertReportTableManage(final List<ConfReportTableManage> list, String sql) {
//        try{
//            jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
//               @Override
//               public int getBatchSize() {
//                return list.size();    //这个方法设定更新记录数，通常List里面存放的都是我们要更新的，所以返回list.size()；
//               }
//                @Override
//                public void setValues(PreparedStatement ps, int i)
//                        throws SQLException {
//                    ConfReportTableManage bean = list.get(i);
//                    ps.setString(SQL_1, bean.getTableName());
//                    ps.setString(SQL_2, bean.getTableNameComment());
//                    ps.setInt(SQL_3, bean.getColumnNo());
//                    ps.setString(SQL_4, bean.getColumnValue());
//                    ps.setString(SQL_5, bean.getColumnName());
//                    ps.setString(SQL_6, bean.getTypeKey());
//                    ps.setString(SQL_7, bean.getTypeValue());
//                }
//            });
//            return 1;
//        }catch (Exception e){
//            logger.error("==========批量插入统计表表结构管理表 Exception:" + e.toString());
//            return 0;
//        }
//    }
//    /**
//     * 批量更新流水表表结构管理表
//     * @param list
//     * @param sql
//     */
//    public int batchUpdateFlowTableManage(final List<ConfFlowTableManage> list, String sql) {
//        try{
//            jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
//               @Override
//               public int getBatchSize() {
//                return list.size();    //这个方法设定更新记录数，通常List里面存放的都是我们要更新的，所以返回list.size()；
//               }
//                @Override
//                public void setValues(PreparedStatement ps, int i)
//                        throws SQLException {
//                    ConfFlowTableManage bean = list.get(i);
//                    ps.setInt(SQL_1, bean.getColumnNo());
//                    ps.setString(SQL_2, bean.getColumnValue());
//                    ps.setString(SQL_3, bean.getColumnName());
//                    ps.setString(SQL_4, bean.getTypeKey());
//                    ps.setString(SQL_5, bean.getTypeValue());
//                    ps.setString(SQL_6, bean.getTableName());
//                    ps.setString(SQL_7, bean.getColumnValueOld());
//                }
//            });
//            return 1;
//        }catch (Exception e){
//            logger.error("==========批量插入流水表表结构管理表 Exception:" + e.toString());
//            return 0;
//        }
//    }
//    /**
//     * 批量更新流水表表结构管理表
//     * @param list
//     * @param sql
//     */
//    public int batchUpdateReportTableManage(final List<ConfReportTableManage> list, String sql) {
//        try{
//            jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
//               @Override
//               public int getBatchSize() {
//                return list.size();    //这个方法设定更新记录数，通常List里面存放的都是我们要更新的，所以返回list.size()；
//               }
//                @Override
//                public void setValues(PreparedStatement ps, int i)
//                        throws SQLException {
//                    ConfReportTableManage bean = list.get(i);
//                    ps.setInt(SQL_1, bean.getColumnNo());
//                    ps.setString(SQL_2, bean.getColumnValue());
//                    ps.setString(SQL_3, bean.getColumnName());
//                    ps.setString(SQL_4, bean.getColumnSQL());
//                    ps.setString(SQL_5, bean.getTypeKey());
//                    ps.setString(SQL_6, bean.getTypeValue());
//                    ps.setString(SQL_7, bean.getTableName());
//                    ps.setString(SQL_8, bean.getColumnValueOld());
//                }
//            });
//            return 1;
//        }catch (Exception e){
//            logger.error("==========批量插入统计表表结构管理表 Exception:" + e.toString());
//            return 0;
//        }
//    }
//    /**
//     * 批量删除流水表表结构信息
//     * @param list
//     * @param sql
//     */
//    public int batchDeleteFlowTableManage(final List<ConfFlowTableManage> list, String sql) {
//        try{
//            jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
//               @Override
//               public int getBatchSize() {
//                return list.size();    //这个方法设定更新记录数，通常List里面存放的都是我们要更新的，所以返回list.size()；
//               }
//                @Override
//                public void setValues(PreparedStatement ps, int i)
//                        throws SQLException {
//                    ConfFlowTableManage bean = list.get(i);
//                    ps.setString(SQL_1, bean.getTableName());
//                    ps.setString(SQL_2, bean.getColumnValue());
//                }
//            });
//            return 1;
//        }catch (Exception e){
//            logger.error("==========批量插入流水表表结构管理表 Exception:" + e.toString());
//            return 0;
//        }
//    }
//    /**
//     * 批量删除统计表表结构信息
//     * @param list
//     * @param sql
//     */
//    public int batchDeleteReportTableManage(final List<ConfReportTableManage> list, String sql) {
//        try{
//            jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
//               @Override
//               public int getBatchSize() {
//                return list.size();    //这个方法设定更新记录数，通常List里面存放的都是我们要更新的，所以返回list.size()；
//               }
//                @Override
//                public void setValues(PreparedStatement ps, int i)
//                        throws SQLException {
//                    ConfReportTableManage bean = list.get(i);
//                    ps.setString(SQL_1, bean.getTableName());
//                    ps.setString(SQL_2, bean.getColumnValue());
//                }
//            });
//            return 1;
//        }catch (Exception e){
//            logger.error("==========批量插入流水表表结构管理表 Exception:" + e.toString());
//            return 0;
//        }
//    }
    /**
     * 更新
     * 
     * @param sql
     * @return
     */
    public int update(String sql) {
        try {
            jdbcTemplate.update(sql);
            return 1;
        } catch (Exception e) {
            return 0;
        }
    }
    /**
     * 执行
     * @param sql
     * @return
     */
    public int execute(String sql) {
        try {
            jdbcTemplate.execute(sql);
            return 1;
        } catch (Exception e) {
            logger.error("================执行脚本出错：" + sql + " Exception:" + e.toString());
            return 0;
        }
    }
	/**
     * 取得JdbcTemplate
     * 
     * @return
     */
	public JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}
	/**
	 * 设置JdbcTemplate
	 * @param dataSource
	 */
	public void setDataSource(DataSource dataSource) {
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}
}
