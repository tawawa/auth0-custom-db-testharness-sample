function login(username, password, callback) {

  // do login check..

  callback(null, {
    user_id: 1,
    nickname: 'arcseldon',
    email: 'richard.seldon@auth0.com',
    user_metadata: {
      account_number: '12345'
    }
  });

}
