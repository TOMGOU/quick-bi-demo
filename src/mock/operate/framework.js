import Mock from 'mockjs'
import cache from '@/common/cache'

// mock开关
let mock = cache.getSessionData('mock')
let mockSwitch = mock === 1 ? '' : '_'

// 获取组织架构数据
Mock.mock(/operation\/store_organization/, 'get' + mockSwitch, {
  'code': 0, // （0，成功，其他都是失败）
  'message': '成功信息',
  // 判断是否有department.manage的权限
  'permissions': ['car.manage', 'serve_car.manage', 'department.manage'],
  'data': {
    dept_id: 1,
    parent_id: '',
    name: '深圳南山大冲测试雷克萨斯',
    children_dept: [{
      dept_id: 3,
      parent_id: 1,
      name: '总经办'
    }, {
      dept_id: 9,
      parent_id: 1,
      name: '服务部',
      children_dept: [{
        dept_id: 11,
        parent_id: 9,
        name: '前台'
      }, {
        dept_id: 13,
        parent_id: 9,
        name: '零件部'
      }]
    }, {
      dept_id: 5,
      parent_id: 1,
      name: '金融保险部'
    }]
  }
})

// 添加子部门
Mock.mock(/operation\/department/, 'post' + mockSwitch, {
  'code': 0, // （0，成功，其他都是失败）
  'message': '成功信息',
  // 判断是否有department.manage的权限
  'permissions': ['car.manage', 'serve_car.manage', 'department.manage'],
  'data': {}
})

// 修改部门名称
Mock.mock(/operation\/rename_department/, 'post' + mockSwitch, {
  'code': 0, // （0，成功，其他都是失败）
  'message': '成功信息',
  // 判断是否有department.manage的权限
  'permissions': ['car.manage', 'serve_car.manage', 'department.manage'],
  'data': {}
})

// 删除部门
Mock.mock(/operation\/delete_department/, 'post' + mockSwitch, {
  'code': 0, // （0，成功，其他都是失败）
  'message': '成功信息',
  // 判断是否有department.manage的权限
  'permissions': ['car.manage', 'serve_car.manage', 'department.manage'],
  'data': {}
})

// 获取部门员工
Mock.mock(/operation\/department_employees\/\d+/, 'get' + mockSwitch, {
  'code': 0, // （0，成功，其他都是失败）
  'message': '成功信息',
  // 判断是否有department.manage的权限
  'permissions': ['car.manage', 'serve_car.manage', 'department.manage'],
  'data': {
    'total_num': 20,
    'employees|20': [{
      'employee_id|1-10000': 1,
      'avatar': Mock.Random.dataImage('40x40'),
      'name': '@cname',
      'mobile_number': /^1[0-9]{10}$/,
      'role_ids': [1, 3, 5], // 该员工拥有的角色
      'dept_ids|1': [1, 3, 5, 9, 11, 13] // 该员工所属的部门
    }]
  }
})

// 获取角色
Mock.mock(/operation\/roles/, 'get' + mockSwitch, {
  'code': 0, // （0，成功，其他都是失败）
  'message': '成功信息',
  // 判断是否有role.manage的权限
  'permissions': ['car.manage', 'serve_car.manage', 'role.manage'],
  'data': [{
    'role_id': 1,
    'name': '超级管理员'
  }, {
    'role_id': 2,
    'name': '总经理'
  }, {
    'role_id': 3,
    'name': '市场经理'
  }, {
    'role_id': 4,
    'name': '二手车经理'
  }, {
    'role_id': 5,
    'name': '销售经理'
  }]
})

// 新增员工
Mock.mock(/operation\/employee/, 'post' + mockSwitch, {
  'code': 0, // （0，成功，其他都是失败）
  'message': '成功信息',
  // 判断是否有department.manage的权限
  'permissions': ['car.manage', 'serve_car.manage', 'department.manage'],
  'data': {}
})

// 获取单个员工资料
Mock.mock(/operation\/employee/, 'get' + mockSwitch, {
  'code': 0, // （0，成功，其他都是失败）
  'message': '成功信息',
  // role.manage的权限
  'permissions': ['car.manage', 'serve_car.manage', 'role.manage'],
  'data': {
    'employee_id': 1,
    'avatar': Mock.Random.dataImage('40x40'),
    'name': '@cname',
    'mobile_number': /^1[0-9]{10}$/,
    'role_ids|1': [1, 2, 3, 4, 5], // 该员工拥有的角色
    'department_ids': [1, 3] // 该员工所属的部门
  }
})

// 修改员工角色
Mock.mock(/operation\/update_employee_roles/, 'post' + mockSwitch, {
  'code': 0, // （0，成功，其他都是失败）
  'message': '成功信息',
  // 判断是否有department.manage的权限
  'permissions': ['car.manage', 'serve_car.manage', 'department.manage'],
  'data': {}
})

// 修改员工资料
Mock.mock(/operation\/update_employee/, 'post' + mockSwitch, {
  'code': 0, // （0，成功，其他都是失败）
  'message': '成功信息',
  // 判断是否有department.manage的权限
  'data': {}
})

// 停用员工（删除）
Mock.mock(/operation\/deactive_employee/, 'post' + mockSwitch, {
  'code': 0, // （0，成功，其他都是失败）
  'message': '成功信息',
  // 判断是否有department.manage的权限
  'permissions': ['car.manage', 'serve_car.manage', 'department.manage'],
  'data': {}
})

// 获取部门员工下是否有续保客户
Mock.mock(/operation\/department_employees\/employee_customers/, 'get' + mockSwitch, {
  'code': 0, // （0，成功，其他都是失败）
  'data': {
    'has_insurance_customers|1': true
  }
})
