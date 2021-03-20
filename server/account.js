import { Accounts } from "meteor/accounts-base";
import { Cookies } from 'meteor/ostrio:cookies';

export const cookie = new Cookies({runOnServer: false});

export function restoreUser() {
	Accounts.user = originalAccountsUser;
	Accounts.userId = originalAccountsUserId;
}

const originalAccountsUser = Accounts.user;
const originalAccountsUserId = Accounts.userId;

// 由于使用cookie拿到loginToken
export function getUserByCookie(cookies) {
	const loginToken = cookie.get("token", cookies);
	return getUserByToken(loginToken);
}

export function getUserByToken(loginToken) {
	if (!loginToken) {
		return;
	}
	const hashedToken = loginToken && Accounts._hashLoginToken(loginToken);
	const selector = { "services.resume.loginTokens.hashedToken": hashedToken };
	const options = { fields: { _id: 1 } };
	return Meteor.users.findOne(selector, options);
}

// 由于使用cookie拿到loginToken，重写Accounts.user，Accounts.userId，所以在publish中使用this.userId || Meteor.userId()来获取登录用户信息
export function patchUserByToken(token) {
	const user = getUserByToken(token);
	Accounts.user = () => user;
	Accounts.userId = () => user && user._id;
}

