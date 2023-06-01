type Variant = {
	id: number;
	name: string;
	slug: string;
	next_ship_date: string | null;
	usp_offer: {};
	attributes: {
	  color: string;
	  color_code: string;
	  color_name: string;
	  memory: string;
	  promotion_label: string;
	  promotion_slider_source: string;
	  promotion_bg_color: string;
	};
	ui_suggested_sort_order: number;
  };

  type Product = {
	id: number;
	name: string;
	slug: string;
	manufacturer: string;
	model: string;
	operating_system: string;
	sim_card_capacity: string;
	refurbished: boolean;
	has_usp: boolean;
	has_5g: boolean;
	has_esim: boolean;
	colors: string[];
	sort_order: number;
	release_date: string;
	default: string;
	variants: Variant[];
	attributes: {
	  promotion_label: string;
	  promotion_slider_source: string;
	  promotion_bg_color: string;
	};
	has_promotion: boolean;
  };

  export type { Product, Variant };
