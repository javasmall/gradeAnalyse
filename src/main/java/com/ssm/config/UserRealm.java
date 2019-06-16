package com.ssm.config;


import com.ssm.bean.login;
import com.ssm.dao.userMapper;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;


/**
 * 自定义Realm
 * @author lenovo
 *
 */
public class UserRealm extends AuthorizingRealm{

	@Autowired (required = false)
	private userMapper userMapepr;
	private final Logger logger= LoggerFactory.getLogger(UserRealm.class);
	/**
	 * 执行授权逻辑
	 */
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection arg0) {
		logger.info("执行逻辑授权");

		//给资源进行授权
		SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();

		//添加资源的授权字符串
		//info.addStringPermission("user:add");

		//到数据库查询当前登录用户的授权字符串
		//获取当前登录用户
//		Subject subject = SecurityUtils.getSubject();
//		User user = (User)subject.getPrincipal();
//		User dbUser = userMapper.findById(user.getId());
//        info.addStringPermission("user:add");
//        info.addStringPermission("user:update");
//		//info.addStringPermission("user:"+dbUser.getPerms());
//		System.out.println("user:"+dbUser.getPerms());

		return info;
	}
	/**
	 * 执行认证逻辑
	 */
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken arg0) throws AuthenticationException {
		System.out.println("执行认证逻辑");
		//编写shiro判断逻辑，判断用户名和密码
		//1.判断用户名
		UsernamePasswordToken token = (UsernamePasswordToken)arg0;
		
		login user = userMapepr.getrole(token.getUsername());
		if(user==null){
			//用户名不存在
			return null;//shiro底层会抛出UnKnowAccountException
		}
		//2.判断密码
		return new SimpleAuthenticationInfo(user,user.getPassword(),"");
	}

}
