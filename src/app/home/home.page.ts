import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  map: Leaflet.Map;

  constructor(private geolocation: Geolocation) {}

  latitude: Number;
  longitude: Number;

  resultado() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;

        this.leafletMap(this.latitude, this.longitude);
      })
      .catch((error) => {
        console.log('Erro ao identificar localização!', error);
      });
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.resultado();
  }

  leafletMap(lat, long) {
    this.map = Leaflet.map('mapId', {
      center: [lat, long],
      zoom: 16,
    });

    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Mapa Leaflet',
    }).addTo(this.map);

    const ondeestou = Leaflet.icon({
      iconUrl:
        'https://www.clockon.com.au/hs-fs/hubfs/i%20Map%20Pin.gif?width=300&name=i%20Map%20Pin.gif',
      iconSize: [30, 30],
      iconAnchor: [15, 20],
      popupAnchor: [-1.5, -20],
    });

    Leaflet.marker(
      { lat: this.latitude, lng: this.longitude },
      { icon: ondeestou }
    )
      .addTo(this.map)
      .bindPopup('Estou aqui');

    const options = {
      radius: 150,
      color: '#0000FF',
      fillColor: '#0000FF',
      fillOpacity: 0.3,
    };

    Leaflet.circle({ lat: this.latitude, lng: this.longitude }, options).addTo(
      this.map
    );
  }

  ngOnDestroy() {
    this.map.remove();
  }
}
