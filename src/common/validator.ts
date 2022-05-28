interface ValidatorForm {
  prop: string,
  validator: (searchDatum: any) => string | undefined
}

export class ValidatorSearchForm {
  private searchFormConfig: any[];
  private validatorArr: ValidatorForm[];
  private searchData: any;

  constructor(searchFormConfig) {
    this.validatorArr = [] // 需要校验单的数据
    this.searchFormConfig = searchFormConfig // 原始配置文件
    this.searchData = {}
    this.init()
  }

  init() {
    this.validatorArr = this.searchFormConfig.filter(el => el.validator).map(({ prop, validator }) => ({ prop, validator }))
  }

  valid(searchData) {
    this.searchData = searchData
    let validResult = ''
    for (const valid of this.validatorArr) {
      const result = valid.validator(this.searchData[valid.prop])//开始校验，并取得校验后的返回信息
      if (result) {//r 如果有确切返回值，说明校验没有通过,中断循环
        validResult = result
        break
      }
    }
    return validResult
  }
}
