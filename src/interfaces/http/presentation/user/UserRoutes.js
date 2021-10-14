module.exports = ({ userController }) => [
  {
    method: 'get',
    path: '/user',
    handler: userController.findUsers,
  },
  {
    method: 'get',
    path: '/user/:id',
    handler: userController.findUser,
  },
  {
    method: 'post',
    path: '/user',
    handler: userController.createUser,
  },
  {
    method: 'put',
    path: '/user/:id',
    handler: userController.changeUser,
  },
  {
    method: 'delete',
    path: '/user/:id',
    handler: userController.deleteUser,
  },
];
