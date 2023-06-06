type VariantType = {
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

  type ProductType = {
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
	variants: VariantType[];
	attributes: {
	  promotion_label: string;
	  promotion_slider_source: string;
	  promotion_bg_color: string;
	};
	has_promotion: boolean;
  };

  type FilterType = {
	manufacturer: string;
	color: string;
	has_5g: boolean | '';
	operating_system: string;
	has_esim: boolean | '';
	refurbished: boolean | '';
	sort: string;
  };

  const Colors = {
	'BLAUW': 'Marine Blauw',
	"CREME": "Creme",
	"DARK PEARL": "Dark Pearl",
	"ELECTRIC GRAPHITE": "Electric Graphite",
	"GEEL": "Geel",
	"GOUD": "Goud",
	"GRAFIET": "Grafiet",
	"GRIJS": "Grijs",
	"GROEN": "Leger Groen",
	"MAGIC BLUE": "Magic Blue",
	"MINT": "Mint",
	"PAARS": "Paars",
	"ROOD": "Rood",
	"ROZE": "Roze",
	"VIOLET": "Violet",
	"WIT": "Wit",
	"ZILVER": "Zilver",
	"ZWART": "Zwart"
}

const OS = {
	"ANDROID": "Android",
	"IOS": "iOS"
}

const colorMap = new Map(Object.entries(Colors));
const osMap = new Map(Object.entries(OS));

  export type { ProductType, VariantType, FilterType };
  export { colorMap, osMap };
