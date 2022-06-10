// export interface Business {
// 	msg: string | any;
// 	status: number | any;
// 	data: Data[];
// }

// export interface Data {
// 	business_id: string | any;
// 	business_name: string | any;
// 	created_at: string | any;
// 	pin: string | any;
// 	device_info: Devices[] | any;
// }
export interface Devices {
	created_at: string;
	device_id: string;
	device_mode: string;
	device_name: string;
	device_size: string;
	device_type: string;
	is_connected: string;
	expand: boolean;
	checked?: boolean;
	packages: Packages[];
}

// export interface Devices {
	// 	device_id: string;
	// 	device_name: string;
// 	packages: Packages[];
// }

interface Packages {
	package_name: string;
	package_id: string;
	apk_path: string;
	type: string;
	is_installed: boolean;
	copy: string;
}
