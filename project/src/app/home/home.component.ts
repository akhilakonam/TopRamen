import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  url : string = 'http://starlord.hackerearth.com/TopRamen';
  restraunts : any;
  countries: string[] = [];
  selectedCountry: string = "";
  jsonData : any;
  constructor(private httpClient : HttpClient) { }

  sortData(){
    this.jsonData.sort((o1, o2)=>{
      let x = o1['Top Ten'].split(' ');
      let y = o2['Top Ten'].split(' ');

      if(isNaN(x[0]) || x[0] === undefined){
        x[0] = '';
      }
      if(isNaN(y[0]) || y[0] === undefined){
        y[0] = '';
      }

      return (y[0].localeCompare(x[0]));
    });
  }

  ngOnInit(): void {
    this.httpClient.get(this.url).subscribe(data => {
      this.jsonData = data;
      this.sortData();
      this.restraunts = this.jsonData;
    });

    this.httpClient.get("https://restcountries.eu/rest/v2/all").subscribe(data => {
        for(let i in data){
          this.countries.push(data[i].name);
        }
        this.countries.unshift('-');
    });
  }

  onChange(country) {
    if(country === '-'){
      this.restraunts = this.jsonData;
    }
    else{
      this.restraunts = this.jsonData.filter((restraunt) => {
        return restraunt.Country === country;
      })
    }
  }

}
