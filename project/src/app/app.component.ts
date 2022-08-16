import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AppService } from './app.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'project';
  myControl: FormControl = new FormControl('');
  options: any[];
  filteredOptions: Observable<any[]>;
  public value = '';
  constructor(public appService: AppService) {
  }

  ngOnInit() {
    this.getOptions();

    //هذا الكود يمكن تشغيله فقط في حالة لم تكن تريد الاتصال بالـ API مرات متعددة
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  ngAfterViewInit() {
  }


  getOptions() {
    this.appService.getAutocomplete(this.value).subscribe(res => {
      this.options = res;
      console.log(res);
    });
  }

  //هذا الكود يمكن تشغيله فقط في حالة لم تكن تريد الاتصال بالـ API مرات متعددة
  private _filter(value: any): any[] {
    const filterValue = value.toLowerCase();

    return this.options;//.filter(option => option.contactNo.toLowerCase().includes(filterValue));
  }
}
