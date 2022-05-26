import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ApiCallService } from 'src/app/services/api-call/api-call.service';
import { Business, Data, Devices } from '../dashboard/business/business';

@Component({
	selector: 'app-event',
	templateUrl: './event.component.html',
	styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

	packageUploadForm: any;
	packageStatus: any[] = [true, false];
	packageType: any[] = ['launcher_apps', 'locker_apps', 'both'];
	isInstalled: any[] = [true, false];
	businessList: Data[] | any;
	deviceList: any;
	deviceListOption: any;

	newArray: string[] = [];
  newArrayList = ['a10', 'c12'];
  emptyData: any;

  masterSelected = false;

  checklist:any = [
	{num: 1, desc: 'Decription'},
    {num: 2, desc: 'Decription'},
    {num: 3, desc: 'Decription'},
  ];
  checkedList:any;

  testForm: any;

	constructor(private http: HttpClient, private fb: FormBuilder, private apiService: ApiCallService) {
		/**
		 * @author Pranto
		 * @description Get business list from API
		 */
		//  this.loaderService.isLoading.subscribe((v) => {
		// 	console.log(v, 'v');
		// 	this.isLoading = v;
		// });
		this.apiService.getBusiness().subscribe((data: Business) => {
			this.businessList = data.data;
			this.businessList.forEach((element: any) => {
				element['parentChecked'] = false;
				element.device_info.forEach((e: any) => {
					e['checked'] = false;
				});
			});
			console.log(this.businessList);
		});

		// this.masterSelected = false;
		// this.checklist = [
		// 	{id:1,value:'Elenor Anderson',isSelected:false},
		// 	{id:2,value:'Caden Kunze',isSelected:true},
		// 	{id:3,value:'Ms. Hortense Zulauf',isSelected:true},
		// 	{id:4,value:'Grady Reichert',isSelected:false},
		// 	{id:5,value:'Dejon Olson',isSelected:false},
		// 	{id:6,value:'Jamir Pfannerstill',isSelected:false},
		// 	{id:7,value:'Aracely Renner DVM',isSelected:false},
		// 	{id:8,value:'Genoveva Luettgen',isSelected:false}
		// ];
		// this.getCheckedItemList();
	}

	ngOnInit(): void {
		this.packageUploadForm = this.fb.group({
			businessName: ['', [Validators.required]],
			// device: this.fb.group({ // make a nested group
			// 	deviceName: [[], [Validators.required]],
			// 	deviceCheck: [''],
			// }),
			device: [[], [Validators.required]],
			// deviceCheck: [this.masterSelected]
		})
		this.testForm = this.fb.group({
			// businessName: ['', [Validators.required]],
			// device: this.fb.group({ // make a nested group
			// 	deviceName: [[], [Validators.required]],
			// 	deviceCheck: [''],
			// }),
			// testData: [this.masterSelected],
			// deviceCheck: [this.masterSelected]
			unitArr: this.fb.array(
				this.checklist.map((unit: any) => {
				  return this.fb.control(false); // Set all initial values to false
				})
			)
		})

	// 	const children: string[] = [];
    // for (let i = 10; i < 36; i++) {
    //   children.push(`${i.toString(36)}${i}`);
    // }
    // this.newArray = children;
	}

	  // Shorten for the template
	  get unitArr (): FormArray {
		return this.testForm.get('unitArr') as FormArray;
	  }

	showDevices(event: any): void {
		// console.log(event);
		// this.deviceList = [];
		this.packageUploadForm.controls.device.setValue([]);
		this.deviceList = this.businessList.filter((item: any) => {
			return item.business_id === event;
		});
		console.log(this.deviceList);
		// const children: string[] = [];
		// for (let i = 10; i < 36; i++) {
		// children.push(`${i.toString(36)}${i}`);
		// }
		// this.deviceListOption = children;
	}
	showPackage(event: any): void {
		// console.log(event);
		// this.deviceList = this.businessList.filter((item: any) => {
		// 	return item.business_id === event;
		// });
		console.log(event);
	}

	// selectAll(): void {
	// 	this.deviceList[0].device_info.forEach((element: any) => {
	// 		element.checked = !element.checked;
	// 	});
	// }

	nzFilterOption(inputValue: string, item: any) {
		console.log(inputValue, item);
		return item.title.indexOf(inputValue) > -1;
	}

	allCheck() {
		// this.deviceList[0].device_info.forEach((element: any) => {
		// 	element.checked = this.masterSelected;
		// });
		// console.log(this.deviceList);
	}

	passValue(event: any, item: any): void {
		this.emptyData = event;
		item.checked = !item.checked;
		// console.log("pass", this.emptyData);
		console.log(this.deviceList);
		// item.checked = !item.checked;


		// this.masterSelected = this.deviceList[0].device_info.every((index: any) => {
		// 	return index.checked == true;
		// });

		// this.packageUploadForm.controls.deviceCheck.setValue(this.masterSelected);

	}

	// The master checkbox will check/ uncheck all items
	checkUncheckAll() {
		for (var i = 0; i < this.checklist.length; i++) {
		  this.checklist[i].isSelected = this.masterSelected;
		}
		this.getCheckedItemList();
	  }

	  // Check All Checkbox Checked
	  isAllSelected(i: any) {
		// this.masterSelected = this.checklist.every(function(item:any) {
		// 	return item.isSelected == true;
		//   })
		// this.getCheckedItemList();
		const control = this.unitArr.controls[i];
    	control.setValue(!control.value); // Toggle checked
	  }

	  // Get List of Checked Items
	  getCheckedItemList(){
		this.checkedList = [];
		for (var i = 0; i < this.checklist.length; i++) {
		  if(this.checklist[i].isSelected)
		  this.checkedList.push(this.checklist[i]);
		}
		this.checkedList = JSON.stringify(this.checkedList);
	  }

	checkAllSelected() {
		return this.testForm.controls.unitArr.controls.every((x: any) => x.value == true)
	  }

	  selectAll(event: any) {
		  let isChecked;
		  isChecked = event.target.checked;
		  console.log(event);
			if (isChecked)
			// this.testForm.controls.unitArr.controls.forEach((control: any) => {
			// 	control.setValue(true);
			// });
			this.testForm.controls.unitArr.controls.map((x: any) => x.patchValue(true))
			else
			this.testForm.controls.unitArr.controls.map((x: any) => x.patchValue(false))
	  }

	handleSubmit(): void {

	}

}
