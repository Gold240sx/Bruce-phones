import { z } from "zod"

export const ApplicationFormSchema = z.object({
		password: z
			.string().min(1, { message: "Password is required"}).optional()
			,
		userAccount: z.string().refine((value) => value === "true" || value === "false", {
			message: "Select either 'true' or 'false' for userAccount",
		}),
		phoneDetails: z.object({
			phoneCountryCode: z.enum(["US", "CA", "EU"]),
			phoneNo: z
				.string()
				.min(10, "Invalid phone number")
				.max(14, "National Phone Number only")
				.refine((value) => /^\(\d{3}\) \d{3}-\d{4}$/.test(value), {
					message: "Phone number should match the format (XXX) XXX-XXXX.",
				}),
		}),
		email: z.string().min(1, "Email is required").email("Please enter a valid email"),
        firstName: z
			.string()
			.regex(/^[a-zA-Z .]+$/, {
				message: "Name can only contain letters, spaces, and periods",
			})
			.min(1, "Please include your first name")
			.max(25, "max: 25 characters"),
        lastName: z
			.string()
			.regex(/^[a-zA-Z .]+$/, {
				message: "Name can only contain letters, spaces, and periods",
			})
			.min(1, "Please include your first name")
			.max(25, "max: 25 characters"),
        address: z.object({
			docDifDelivAdd: z.string().refine((value) => value === "true" || value === "false", {
			    message: "Select either 'true' or 'false' for userAccount",
		    }),
			document: z.object({
				addressLn1: z.string(),
				city: z.string(),
				state: z.object({
                    label: z.string().min(2).max(2),
                    value: z.string().min(2).max(2),
                }),
				zip: z.string().min(5).max(5),
			}),
			physical: z.object({
				addressLn1: z.string().optional(),
				city: z.string().optional(),
				state: z.object({
                    label: z.string().min(2).max(2).optional(),
                    value: z.string().min(2).max(2).optional(),
                }).optional(),
				zip: z.string().min(5).max(5).optional(),
			}).optional(),
		}),
	}).superRefine((values, context) => {
		if (values.userAccount === "true" && !values.password) {
			context.addIssue({
				code: z.ZodIssueCode.custom,
				message: "password required",
				path: ["password"],
			})
		}
        if (values.address.docDifDelivAdd === "true" && !values.address.physical!.addressLn1) {
            context.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Please provide your shipping address otherwise, if it is the same as the address on your documents, click on the toggle above",
				path: ["address.physical.addressLn1"],
			})
        }
           if (values.address.docDifDelivAdd === "true" &&  !values.address.physical!.city) {
            context.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Provide your City",
				path: ["address.physical.city"],
			})
        }
           if (values.address.docDifDelivAdd === "true" &&  !values.address.physical!.state.label) {
            context.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Select State",
				path: ["address.physical.state"],
			})
        }
           if (values.address.docDifDelivAdd === "true" && !values.address.physical!.zip) {
            context.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Provide your Shipping Zip Code / Postal Code",
				path: ["address.physical.zip"],
			})
        }
    })

export type step = {
    id: string
    name: string
    fields?: string[]
}

export const formatPhoneNo = (inputValue: string) => {
	const sanitizedValue = inputValue.replace(/[^\d]/g, "")
	let formattedValue = ""

	if (sanitizedValue.length <= 3) {
		formattedValue = sanitizedValue
	} else if (sanitizedValue.length <= 6) {
		formattedValue = `(${sanitizedValue.slice(0, 3)}) ${sanitizedValue.slice(3)}`
	} else {
		formattedValue = `(${sanitizedValue.slice(0, 3)}) ${sanitizedValue.slice(3, 6)}-${sanitizedValue.slice(6, 10)}`
	}
	return formattedValue
}

export const valueToDropdownConversion = (stringArray: string[]) => {
	const objectArray = stringArray.map((string: string) => {
		return { label: string, value: string }
	})
	return objectArray
}

export const states = [
	"AL",
	"AK",
	"AZ",
	"AR",
	"CA",
	"CO",
	"CT",
	"DE",
	"FL",
	"GA",
	"HI",
	"ID",
	"IL",
	"IN",
	"IA",
	"KS",
	"KY",
	"LA",
	"ME",
	"MD",
	"MA",
	"MI",
	"MN",
	"MS",
	"MO",
	"MT",
	"NE",
	"NV",
	"NH",
	"NJ",
	"NM",
	"NY",
	"NC",
	"ND",
	"OH",
	"OK",
	"OR",
	"PA",
	"RI",
	"SC",
	"SD",
	"TN",
	"TX",
	"UT",
	"VT",
	"VA",
	"WA",
	"WV",
	"WI",
	"WY",
]

export function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ")
}