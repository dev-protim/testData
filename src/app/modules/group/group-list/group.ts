export interface Group {
	id: string;
	group_name: string;
	expand: boolean;
	devices: Devices[];
}

interface Devices {
	created_at: string;
	device_id: string;
	device_mode: string;
	device_name: string;
	device_size: string;
	device_type: string;
	is_connected: boolean;
}
