/**
 * mixin 省市区三级联动
 */
import { province, city, area } from 'city-data/lib/pc';

export default {
  data () {
    return {
      provinceOptions: [],
      cityOptions: [],
      districtOptions: [],
    };
  },
  methods: {
    initAddress() {},
    getProvince() {
      this.provinceOptions = province;
    },
    getCity(code) {
      this.cityOptions = [];
      Object.keys(city).forEach(k => {
        if (city[k].parentId === code) {
          this.cityOptions.push(city[k]);
        }
      });
    },
    getArea(code) {
      this.districtOptions = [];
      Object.keys(area).forEach(j => {
        if (area[j].parentId === code) {
          this.districtOptions.push(area[j]);
        }
      });
      if (this.districtOptions.length === 0) {
        this.districtOptions.push({
          code: `${code}--`,
          name: '--',
          parentId: code,
        });
      }
    },
    getObjByName(name, arr) {
      return arr.find(item => item.name === name);
    },
    getObjByCode(code, arr) {
      return arr.find(item => item.code === code);
    },
  },
};
