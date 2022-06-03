export interface Business {
	msg: string | any;
	status: number | any;
	data: Data[];
}

export interface Data {
	business_id: string | any;
	business_name: string | any;
	created_at: string | any;
	pin: string | any;
	device_info: Devices[] | any;
}

export interface Devices {
	device_id: string | any;
	device_name: string | any;
	packages: Packages[] | any;
}

interface Packages {
	package_name: string | any;
	package_id: string | any;
	apk_path: string | any;
	type: string | any;
	is_installed: boolean | any;
}
