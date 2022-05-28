import { debug } from 'util';

/**
 * mixin 全局地图展示&定位
 */

export default {
  data () {
    return {
      mapConfig: {
        mapContainerId: 'map-wrap',
        geocoder: null,
        latLng: null,
        map: null,
        marker: null,
        qMaps: window.qq.maps,
        // promise: null
      },
    };
  },
  created () {
    // this.mapConfig.promise = new Promise((resolve) => {
    //   this.loadScript('https://apis.map.qq.com/api/js?v=2.exp&key=STMBZ-K5HH5-LMKIB-QPNHM-HH74S-YLFNU', () => {
    //     resolve(window.qq.maps)
    //   })
    // })
  },
  methods: {
    loadScript(url, callback) {
      const script = document.createElement('script');
      script.charset = 'utf-8';
      if (script.readyState) { // IE
        script.onreadystatechange = () => {
          if (script.readyState === 'loaded' || script.readyState === 'complete') {
            script.onreadystatechange = null;
            callback();
          }
        };
      } else { // Others
        script.onload = function () {
          callback();
        };
      }
      script.src = url;
      document.getElementsByTagName('head')[0].appendChild(script);
    },
    initMap(lat, lng, noH5, fn) {
      if (!this.mapConfig.map) { // 地图未定义
        this.initMapByLatLng({ // 默认北京
          lat: lat || 39.916527,
          lng: lng || 116.397128,
        }, fn);
      }
      if ((!lat || !lng) && !noH5) {
        this.getLocationByH5();
      }
      // if (address) {
      //   this.getLocationByAddress(address)
      // } else {
      //   this.getLocationByH5()
      // }
    },
    getLocationByAddress(address, fn) {
      if (!this.mapConfig.geocoder) {
        this.mapConfig.geocoder = new this.mapConfig.qMaps.Geocoder({
          complete: (result) => {
            this.mapConfig.map.setCenter(result.detail.location);
            // 改变标记位置
            this.mapConfig.marker.setPosition(result.detail.location);
            fn && fn(result.detail.location);
          },
        });
      }
      this.mapConfig.geocoder.getLocation(address);
    },
    getLocationByH5() {
      const { geolocation } = window.navigator;
      // 判断是否支持 获取本地位置
      if (geolocation) {
        geolocation.getCurrentPosition(this.showPositionInMap);
      }
    },
    showPositionInMap(position, fn) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      this.mapConfig.latLng = new this.mapConfig.qMaps.LatLng(lat, lng);
      // 调用地图命名空间中的转换接口   type的可选值为 1:GPS经纬度，2:搜狗经纬度，3:百度经纬度，4:mapbar经纬度，5:google经纬度，6:搜狗墨卡托
      if (this.mapConfig.qMaps.convertor && this.mapConfig.map) {
        this.mapConfig.qMaps.convertor.translate(this.mapConfig.latLng, 1, (res) => {
          // 取出经纬度并且赋值
          [this.mapConfig.latLng] = res;
          // 改版地图中心点
          // this.map.setCenter(this.latLng)
          this.mapConfig.map.panTo(this.mapConfig.latLng);
          // 改变标记位置
          this.mapConfig.marker.setPosition(this.mapConfig.latLng);
          this.mapConfig.qMaps.event.addListener(this.mapConfig.marker, 'dragend', () => {
            const pos = this.mapConfig.marker.getPosition();
            fn({
              lat: pos.getLat(),
              lng: pos.getLng(),
            });
          });
        });
      } else {
        // 改版地图中心点
        this.mapConfig.map.panTo(this.mapConfig.latLng);
        // 改变标记位置
        this.mapConfig.marker.setPosition(this.mapConfig.latLng);
      }
    },
    // 初始化地图
    initMapByLatLng(latLng, fn) {
      this.mapConfig.latLng = new this.mapConfig.qMaps.LatLng(latLng.lat, latLng.lng);
      this.mapConfig.map = new this.mapConfig.qMaps.Map(document.getElementById(this.mapConfig.mapContainerId), {
        center: this.mapConfig.latLng,
        zoom: 13,
      });
      this.mapConfig.map.setOptions({
        keyboardShortcuts: false, // 禁止通过键盘控制地图
        scrollwheel: false, // 禁止滚动缩放
      });

      // 设置marker标记
      this.mapConfig.marker = new this.mapConfig.qMaps.Marker({
        map: this.mapConfig.map,
        draggable: true,
        position: this.mapConfig.latLng,
      });
      // 标注绑定拖拽事件
      this.mapConfig.qMaps.event.addListener(this.mapConfig.marker, 'dragend', () => {
        const pos = this.mapConfig.marker.getPosition();
        fn({
          lat: pos.getLat(),
          lng: pos.getLng(),
        });
      });
    },
  },
};
