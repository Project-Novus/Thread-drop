import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShopifyService } from 'src/app/core/services/shopify.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  formSubmitted:boolean = false;
  contactForm!: FormGroup<any>;
  loading:boolean = false;
  signUpError:boolean = false;
  showPassword:boolean = false;
  errorMessage:string ='';
  countryCodes = [
    {"country": "AFG", "code": "93"},
    {"country": "ALA", "code": "358"},
    {"country": "ALB", "code": "355"},
    {"country": "DZA", "code": "213"},
    {"country": "ASM", "code": "1684"},
    {"country": "AND", "code": "376"},
    {"country": "AGO", "code": "244"},
    {"country": "AIA", "code": "1264"},
    {"country": "ATA", "code": "672"},
    {"country": "ATG", "code": "1268"},
    {"country": "ARG", "code": "54"},
    {"country": "ARM", "code": "374"},
    {"country": "ABW", "code": "297"},
    {"country": "AUS", "code": "61"},
    {"country": "AUT", "code": "43"},
    {"country": "AZE", "code": "994"},
    {"country": "BHS", "code": "1242"},
    {"country": "BHR", "code": "973"},
    {"country": "BGD", "code": "880"},
    {"country": "BRB", "code": "1246"},
    {"country": "BLR", "code": "375"},
    {"country": "BEL", "code": "32"},
    {"country": "BLZ", "code": "501"},
    {"country": "BEN", "code": "229"},
    {"country": "BMU", "code": "1441"},
    {"country": "BTN", "code": "975"},
    {"country": "BOL", "code": "591"},
    {"country": "BES", "code": "599"},
    {"country": "BIH", "code": "387"},
    {"country": "BWA", "code": "267"},
    {"country": "BRA", "code": "55"},
    {"country": "IOT", "code": "246"},
    {"country": "BRN", "code": "673"},
    {"country": "BGR", "code": "359"},
    {"country": "BFA", "code": "226"},
    {"country": "BDI", "code": "257"},
    {"country": "CPV", "code": "238"},
    {"country": "KHM", "code": "855"},
    {"country": "CMR", "code": "237"},
    {"country": "CAN", "code": "1"},
    {"country": "CYM", "code": "1345"},
    {"country": "CAF", "code": "236"},
    {"country": "TCD", "code": "235"},
    {"country": "CHL", "code": "56"},
    {"country": "CHN", "code": "86"},
    {"country": "CXR", "code": "61"},
    {"country": "CCK", "code": "61"},
    {"country": "COL", "code": "57"},
    {"country": "COM", "code": "269"},
    {"country": "COG", "code": "242"},
    {"country": "COD", "code": "243"},
    {"country": "COK", "code": "682"},
    {"country": "CRI", "code": "506"},
    {"country": "CIV", "code": "225"},
    {"country": "HRV", "code": "385"},
    {"country": "CUB", "code": "53"},
    {"country": "CUW", "code": "599"},
    {"country": "CYP", "code": "357"},
    {"country": "CZE", "code": "420"},
    {"country": "DNK", "code": "45"},
    {"country": "DJI", "code": "253"},
    {"country": "DMA", "code": "1767"},
    {"country": "DOM", "code": "849"},
    {"country": "ECU", "code": "593"},
    {"country": "EGY", "code": "20"},
    {"country": "SLV", "code": "503"},
    {"country": "GNQ", "code": "240"},
    {"country": "ERI", "code": "291"},
    {"country": "EST", "code": "372"},
    {"country": "SWZ", "code": "268"},
    {"country": "ETH", "code": "251"},
    {"country": "FLK", "code": "500"},
    {"country": "FRO", "code": "298"},
    {"country": "FJI", "code": "679"},
    {"country": "FIN", "code": "358"},
    {"country": "FRA", "code": "33"},
    {"country": "GUF", "code": "594"},
    {"country": "PYF", "code": "689"},
    {"country": "GAB", "code": "241"},
    {"country": "GMB", "code": "220"},
    {"country": "GEO", "code": "995"},
    {"country": "DEU", "code": "49"},
    {"country": "GHA", "code": "233"},
    {"country": "GIB", "code": "350"},
    {"country": "GRC", "code": "30"},
    {"country": "GRL", "code": "299"},
    {"country": "GRD", "code": "1473"},
    {"country": "GLP", "code": "590"},
    {"country": "GUM", "code": "1671"},
    {"country": "GTM", "code": "502"},
    {"country": "GGY", "code": "44"},
    {"country": "GIN", "code": "224"},
    {"country": "GNB", "code": "245"},
    {"country": "GUY", "code": "592"},
    {"country": "HTI", "code": "509"},
    {"country": "VAT", "code": "379"},
    {"country": "HND", "code": "504"},
    {"country": "HKG", "code": "852"},
    {"country": "HUN", "code": "36"},
    {"country": "ISL", "code": "354"},
    {"country": "IND", "code": "91"},
    {"country": "IDN", "code": "62"},
    {"country": "IRN", "code": "98"},
    {"country": "IRQ", "code": "964"},
    {"country": "IRL", "code": "353"},
    {"country": "IMN", "code": "44"},
    {"country": "ISR", "code": "972"},
    {"country": "ITA", "code": "39"},
    {"country": "JAM", "code": "1876"},
    {"country": "JPN", "code": "81"},
    {"country": "JEY", "code": "44"},
    {"country": "JOR", "code": "962"},
    {"country": "KAZ", "code": "7"},
    {"country": "KEN", "code": "254"},
    {"country": "KIR", "code": "686"},
    {"country": "PRK", "code": "850"},
    {"country": "KOR", "code": "82"},
    {"country": "KWT", "code": "965"},
    {"country": "KGZ", "code": "996"},
    {"country": "LAO", "code": "856"},
    {"country": "LVA", "code": "371"},
    {"country": "LBN", "code": "961"},
    {"country": "LSO", "code": "266"},
    {"country": "LBR", "code": "231"},
    {"country": "LBY", "code": "218"},
    {"country": "LIE", "code": "423"},
    {"country": "LTU", "code": "370"},
    {"country": "LUX", "code": "352"},
    {"country": "MAC", "code": "853"},
    {"country": "MDG", "code": "261"},
    {"country": "MWI", "code": "265"},
    {"country": "MYS", "code": "60"},
    {"country": "MDV", "code": "960"},
    {"country": "MLI", "code": "223"},
    {"country": "MLT", "code": "356"},
    {"country": "MHL", "code": "692"},
    {"country": "MTQ", "code": "596"},
    {"country": "MRT", "code": "222"},
    {"country": "MUS", "code": "230"},
    {"country": "MYT", "code": "262"},
    {"country": "MEX", "code": "52"},
    {"country": "FSM", "code": "691"},
    {"country": "MDA", "code": "373"},
    {"country": "MCO", "code": "377"},
    {"country": "MNG", "code": "976"},
    {"country": "MNE", "code": "382"},
    {"country": "MSR", "code": "1664"},
    {"country": "MAR", "code": "212"},
    {"country": "MOZ", "code": "258"},
    {"country": "MMR", "code": "95"},
    {"country": "NAM", "code": "264"},
    {"country": "NRU", "code": "674"},
    {"country": "NPL", "code": "977"},
    {"country": "NLD", "code": "31"},
    {"country": "NCL", "code": "687"},
    {"country": "NZL", "code": "64"},
    {"country": "NIC", "code": "505"},
    {"country": "NER", "code": "227"},
    {"country": "NGA", "code": "234"},
    {"country": "NIU", "code": "683"},
    {"country": "NFK", "code": "672"},
    {"country": "MKD", "code": "389"},
    {"country": "MNP", "code": "1670"},
    {"country": "NOR", "code": "47"},
    {"country": "OMN", "code": "968"},
    {"country": "PAK", "code": "92"},
    {"country": "PLW", "code": "680"},
    {"country": "PSE", "code": "970"},
    {"country": "PAN", "code": "507"},
    {"country": "PNG", "code": "675"},
    {"country": "PRY", "code": "595"},
    {"country": "PER", "code": "51"},
    {"country": "PHL", "code": "63"},
    {"country": "PCN", "code": "64"},
    {"country": "POL", "code": "48"},
    {"country": "PRT", "code": "351"},
    {"country": "PRI", "code": "1"},
    {"country": "QAT", "code": "974"},
    {"country": "REU", "code": "262"},
    {"country": "ROU", "code": "40"},
    {"country": "RUS", "code": "7"},
    {"country": "RWA", "code": "250"},
    {"country": "BLM", "code": "590"},
    {"country": "SHN", "code": "290"},
    {"country": "KNA", "code": "1869"},
    {"country": "LCA", "code": "1758"},
    {"country": "MAF", "code": "590"},
    {"country": "SPM", "code": "508"},
    {"country": "VCT", "code": "1784"},
    {"country": "WSM", "code": "685"},
    {"country": "SMR", "code": "378"},
    {"country": "STP", "code": "239"},
    {"country": "SAU", "code": "966"},
    {"country": "SEN", "code": "221"},
    {"country": "SRB", "code": "381"},
    {"country": "SYC", "code": "248"},
    {"country": "SLE", "code": "232"},
    {"country": "SGP", "code": "65"},
    {"country": "SXM", "code": "1721"},
    {"country": "SVK", "code": "421"},
    {"country": "SVN", "code": "386"},
    {"country": "SLB", "code": "677"},
    {"country": "SOM", "code": "252"},
    {"country": "ZAF", "code": "27"},
    {"country": "SSD", "code": "211"},
    {"country": "ESP", "code": "34"},
    {"country": "LKA", "code": "94"},
    {"country": "SDN", "code": "249"},
    {"country": "SUR", "code": "597"},
    {"country": "SWE", "code": "46"},
    {"country": "CHE", "code": "41"},
    {"country": "SYR", "code": "963"},
    {"country": "TWN", "code": "886"},
    {"country": "TJK", "code": "992"},
    {"country": "TZA", "code": "255"},
    {"country": "THA", "code": "66"},
    {"country": "TLS", "code": "670"},
    {"country": "TGO", "code": "228"},
    {"country": "TKL", "code": "690"},
    {"country": "TON", "code": "676"},
    {"country": "TTO", "code": "1868"},
    {"country": "TUN", "code": "216"},
    {"country": "TUR", "code": "90"},
    {"country": "TKM", "code": "993"},
    {"country": "TCA", "code": "1649"},
    {"country": "TUV", "code": "688"},
    {"country": "UGA", "code": "256"},
    {"country": "UKR", "code": "380"},
    {"country": "ARE", "code": "971"},
    {"country": "GBR", "code": "44"},
    {"country": "USA", "code": "1"},
    {"country": "URY", "code": "598"},
    {"country": "UZB", "code": "998"},
    {"country": "VUT", "code": "678"},
    {"country": "VEN", "code": "58"},
    {"country": "VNM", "code": "84"},
    {"country": "VGB", "code": "1284"},
    {"country": "VIR", "code": "1340"},
    {"country": "WLF", "code": "681"},
    {"country": "ESH", "code": "212"},
    {"country": "YEM", "code": "967"},
    {"country": "ZMB", "code": "260"},
    {"country": "ZWE", "code": "263"},
    {"country": "SCT", "code": "44"},
    {"country": "WLS", "code": "44"}
]
  @Output() signupEvent: EventEmitter<any> = new EventEmitter()
  constructor(private fb:FormBuilder,private shopifyService:ShopifyService,private router:Router) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      password:['', Validators.required],
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      countryCode: ['91', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    })
  }

  // Accessors for form controls in your template
  get email() { return this.contactForm?.get('email'); }
  get password() { return this.contactForm?.get('password'); }


  signup(){
    console.log(this.contactForm.value);
    
    const formData = JSON.parse(JSON.stringify(this.contactForm.value)) 
    formData.phone = '+'+formData.countryCode+formData.phone 
    formData['acceptsMarketing'] = true
    delete formData['countryCode']
    if (this.contactForm.controls['password'].valid && 
        this.contactForm.controls['email'].valid &&
        this.contactForm.controls['firstName'].valid && 
        this.contactForm.controls['lastName'].valid &&
        this.contactForm.controls['countryCode'].valid &&
        this.contactForm.controls['phone'].valid){
      // Form is valid, proceed with submission
      this.loading = true
          console.log(formData);
          this.shopifyService.createCustomer(formData).subscribe({
            next:(res)=>{console.log(res);
              try {
                this.handleCustomerCreation(res?.data?.customerCreate);
              } catch (error) {
                console.log(error);
                this.loading  = false;
                this.signUpError = true;
                this.errorMessage = "Sorry for the inconvenience, Server Error"
              }
            },
            error:(error)=>{
              this.loading=false; 
              console.log(error);
              this.signUpError = true;
              this.errorMessage = "Sorry for the inconvenience, Server Error"
            
            }
          })
          
    } else {
      // Form is invalid, mark controls as touched to display errors
      this.contactForm.markAllAsTouched();
      this.loading = false
    }
  
}

handleShowPassword(){
  const pw = document.getElementById('passwordInput') as any
  pw.type == 'password' ? pw.type = 'text' : pw.type = 'password'
  this.showPassword = !this.showPassword
}

focusOutPhone(){
  if(this.contactForm.controls['phone'].value?.toString().length != 10){
    this.contactForm.controls['phone'].setErrors({'phoneLength':true})
  }else{

    const errors = this.contactForm?.controls['phone'].errors;
    if(errors){
      delete errors['phoneLength'];
      this.contactForm.updateValueAndValidity()
    }
  }

  
}
focusoutPassword(){
  if(this.contactForm.controls['password'].value?.toString().length < 5){
    this.contactForm.controls['password'].setErrors({'tooShortPassword':true})
  }else{
    const errors = this.contactForm?.controls['password'].errors;
    if(errors){
      delete errors['tooShortPassword'];
      this.contactForm.updateValueAndValidity()
    }
  }
}

handleCustomerCreation(customerCreateObject:any){
  this.loading = false;
    if(customerCreateObject.customerUserErrors.length){
      this.signUpError =  true
      this.errorMessage = customerCreateObject.customerUserErrors[0].message
    }else{
      this.signUpError =  false
      this.router.navigate(['/account'])
    }
}
}
