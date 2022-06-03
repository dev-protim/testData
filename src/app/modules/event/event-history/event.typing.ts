export interface EventHistory {
	limit: number;
	msg: string;
	status: number;
	total_items: number;
	data?: {
		created_time: string;
		event_id: string;
		message: string;
		ref_business_id: string;
		ref_device_id: string;
		status: string;
		value_of_command: string;
	}
}
