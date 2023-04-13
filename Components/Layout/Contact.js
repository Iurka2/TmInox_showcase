import styles from '../../styles/Components/contact.module.css'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form';
import { FiArrowUpRight } from "react-icons/fi";
import { FiPhone } from "react-icons/fi";
import { FiMail } from "react-icons/fi";
import { FiMapPin } from "react-icons/fi";
import { IconContext } from "react-icons";
import toast from "react-hot-toast";
import { useState } from 'react';
import { Formik} from 'formik';
import * as Yup from 'yup';
import { sendContactForm } from '../../utils/firebase/api';






const Contact = () => {
  

  const { t } = useTranslation();

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
  .required(t('common:form1')),
  phone: Yup.string()
    .required(t('common:form2'))
    .matches(/^(\+?\d{9,})$/, t('common:error_phone')),
  email: Yup.string()
    .email(t('common:error_email'))
    .required(t('common:form3')),
  message: Yup.string()
    .required(t('common:error_message')),
  country: Yup.string()
    .required(t('common:error_country')),
  });



	// const getCategories = async (manufacturer) => {
  //   setCategories([]);
  //   if (manufacturer != null) {
  //     const categories = await db
  //       .collection("manufacturers")
  //       .doc(manufacturer)
  //       .collection("categories")
  //       .get();

  //     const ctgData = categories.docs.map((ctg) => ({
  //       value: ctg.id,
  //       label: localisator == "ro" ? ctg.data().ctgRo : ctg.data().ctgEn,
  //     }));

  //     setCategories(JSON.parse(JSON.stringify(ctgData)));
  //     // console.log("Filter categories\n", ctgData)
  //   } else {
  //   }
  // };


  // const onSubmit = async () => {
  //   await sendContactForm(values);
  // };

	const [error, setError] = useState(null);
  return ( 

<div className={styles.container}>

<h1 id="contactSection" className={styles.heder}>{t('common:drawer_h1')}</h1>

 <div className={styles.grid}>
     <Formik
       initialValues={{ name: '', company: '', phone: "", email: "", message: "",address: "", country:"" }}
       validationSchema={SignupSchema}

			 
       
       onSubmit={ async (values) => {
				try {
					await sendContactForm(values);
					toast.success("Message sent", {
						style: {
							background: "#191716",
							color: "#fff",
						},
					});
				} catch (error) {
					console.log(error);
				}
       }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleSubmit,
         isSubmitting,
       }) => (
 <form className={styles.formContainer} onSubmit={handleSubmit}>

<div className={styles.formContainer2} >
  <input 
    type="text" 
    name='name' 
    value={values.name}
    onChange={handleChange}
    className={styles.name} 
    placeholder={t('common:1_form')}

    />
   <span className={styles.erorMesage}>{errors.name && touched.name && errors.name }</span>

  <input 
      type="text" 
      name='company' 
      value={values.company}
      onChange={handleChange}
      className={styles.name2}  
      placeholder={t('common:2_form')} />
   <span className={styles.erorMesage}></span>

   <select   
      name='country' 
      value={values.country}
      onChange={handleChange}
      className={styles.name6} 
		
      >
											<option  value="">{t('common:country')}</option>
																							<option  value="United States">United States</option>
																							<option value="Canada">Canada</option>
																							<option value="Afghanistan">Afghanistan</option>
																							<option value="Albania">Albania</option>
																							<option value="Algeria">Algeria</option>
																							<option value="American Samoa">American Samoa</option>
																							<option value="Andorra">Andorra</option>
																							<option value="Angola">Angola</option>
																							<option value="Anguilla">Anguilla</option>
																							<option value="Antarctica">Antarctica</option>
																							<option value="Antigua and Barbuda">Antigua and Barbuda</option>
																							<option value="Argentina">Argentina</option>
																							<option value="Armenia">Armenia</option>
																							<option value="Aruba">Aruba</option>
																							<option value="Australia">Australia</option>
																							<option value="Austria">Austria</option>
																							<option value="Azerbaijan">Azerbaijan</option>
																							<option value="Bahamas">Bahamas</option>
																							<option value="Bahrain">Bahrain</option>
																							<option value="Bangladesh">Bangladesh</option>
																							<option value="Barbados">Barbados</option>
																							<option value="Belarus">Belarus</option>
																							<option value="Belgium">Belgium</option>
																							<option value="Belize">Belize</option>
																							<option value="Benin">Benin</option>
																							<option value="Bermuda">Bermuda</option>
																							<option value="Bhutan">Bhutan</option>
																							<option value="Bolivia, Plurinational State of">Bolivia, Plurinational State of</option>
																							<option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
																							<option value="Botswana">Botswana</option>
																							<option value="Bouvet Island">Bouvet Island</option>
																							<option value="Brazil">Brazil</option>
																							<option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
																							<option value="Virgin Islands, British">Virgin Islands, British</option>
																							<option value="Brunei Darussalam">Brunei Darussalam</option>
																							<option value="Bulgaria">Bulgaria</option>
																							<option value="Burkina Faso">Burkina Faso</option>
																							<option value="Burundi">Burundi</option>
																							<option value="Cambodia">Cambodia</option>
																							<option value="Cameroon">Cameroon</option>
																							<option value="Cape Verde">Cape Verde</option>
																							<option value="Cayman Islands">Cayman Islands</option>
																							<option value="Central African Republic">Central African Republic</option>
																							<option value="Chad">Chad</option>
																							<option value="Chile">Chile</option>
																							<option value="China">China</option>
																							<option value="Christmas Island">Christmas Island</option>
																							<option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
																							<option value="Colombia">Colombia</option>
																							<option value="Comoros">Comoros</option>
																							<option value="Congo">Congo</option>
																							<option value="Cook Islands">Cook Islands</option>
																							<option value="Costa Rica">Costa Rica</option>
																							<option value="Croatia">Croatia</option>
																							<option value="Cuba">Cuba</option>
																							<option value="Cyprus">Cyprus</option>
																							<option value="Czech Republic">Czech Republic</option>
																							<option value="Côte d’Ivoire">Côte d’Ivoire</option>
																							<option value="Denmark">Denmark</option>
																							<option value="Djibouti">Djibouti</option>
																							<option value="Dominica">Dominica</option>
																							<option value="Dominican Republic">Dominican Republic</option>
																							<option value="Dutch Antilles">Dutch Antilles</option>
																							<option value="East Timor">East Timor</option>
																							<option value="Ecuador">Ecuador</option>
																							<option value="Egypt">Egypt</option>
																							<option value="El Salvador">El Salvador</option>
																							<option value="Equatorial Guinea">Equatorial Guinea</option>
																							<option value="Eritrea">Eritrea</option>
																							<option value="Estonia">Estonia</option>
																							<option value="Ethiopia">Ethiopia</option>
																							<option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
																							<option value="Faroe Islands">Faroe Islands</option>
																							<option value="Fiji">Fiji</option>
																							<option value="Finland">Finland</option>
																							<option value="France">France</option>
																							<option value="French Guiana">French Guiana</option>
																							<option value="French Polynesia">French Polynesia</option>
																							<option value="Gabon">Gabon</option>
																							<option value="Gambia">Gambia</option>
																							<option value="Georgia">Georgia</option>
																							<option value="Germany">Germany</option>
																							<option value="Ghana">Ghana</option>
																							<option value="Gibraltar">Gibraltar</option>
																							<option value="Greece">Greece</option>
																							<option value="Greenland">Greenland</option>
																							<option value="Grenada">Grenada</option>
																							<option value="Guadeloupe">Guadeloupe</option>
																							<option value="Guam">Guam</option>
																							<option value="Guatemala">Guatemala</option>
																							<option value="Guinea">Guinea</option>
																							<option value="Guinea-Bissau">Guinea-Bissau</option>
																							<option value="Guyana">Guyana</option>
																							<option value="Haiti">Haiti</option>
																							<option value="Heard Island and McDonald Islands">Heard Island and McDonald Islands</option>
																							<option value="Honduras">Honduras</option>
																							<option value="Hong Kong S.A.R., China">Hong Kong S.A.R., China</option>
																							<option value="Hungary">Hungary</option>
																							<option value="Iceland">Iceland</option>
																							<option value="India">India</option>
																							<option value="Indonesia">Indonesia</option>
																							<option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
																							<option value="Iraq">Iraq</option>
																							<option value="Ireland">Ireland</option>
																							<option value="Israel">Israel</option>
																							<option value="Italy">Italy</option>
																							<option value="Jamaica">Jamaica</option>
																							<option value="Japan">Japan</option>
																							<option value="Jordan">Jordan</option>
																							<option value="Kazakhstan">Kazakhstan</option>
																							<option value="Kenya">Kenya</option>
																							<option value="Kiribati">Kiribati</option>
																							<option value="Kosovo">Kosovo</option>
																							<option value="Kuwait">Kuwait</option>
																							<option value="Kyrgyzstan">Kyrgyzstan</option>
																							<option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
																							<option value="Latvia">Latvia</option>
																							<option value="Lebanon">Lebanon</option>
																							<option value="Lesotho">Lesotho</option>
																							<option value="Liberia">Liberia</option>
																							<option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
																							<option value="Liechtenstein">Liechtenstein</option>
																							<option value="Lithuania">Lithuania</option>
																							<option value="Luxembourg">Luxembourg</option>
																							<option value="Macao S.A.R., China">Macao S.A.R., China</option>
																							<option value="Macedonia, the former Yugoslav Republic of">Macedonia, the former Yugoslav Republic of</option>
																							<option value="Madagascar">Madagascar</option>
																							<option value="Malawi">Malawi</option>
																							<option value="Malaysia">Malaysia</option>
																							<option value="Maldives">Maldives</option>
																							<option value="Mali">Mali</option>
																							<option value="Malta">Malta</option>
																							<option value="Marshall Islands">Marshall Islands</option>
																							<option value="Martinique">Martinique</option>
																							<option value="Mauritania">Mauritania</option>
																							<option value="Mauritius">Mauritius</option>
																							<option value="Mayotte">Mayotte</option>
																							<option value="Mexico">Mexico</option>
																							<option value="Micronesia">Micronesia</option>
																							<option value="Moldova, Republic of">Moldova, Republic of</option>
																							<option value="Monaco">Monaco</option>
																							<option value="Mongolia">Mongolia</option>
																							<option value="Montenegro">Montenegro</option>
																							<option value="Montserrat">Montserrat</option>
																							<option value="Morocco">Morocco</option>
																							<option value="Mozambique">Mozambique</option>
																							<option value="Myanmar">Myanmar</option>
																							<option value="Namibia">Namibia</option>
																							<option value="Nauru">Nauru</option>
																							<option value="Nepal">Nepal</option>
																							<option value="Netherlands">Netherlands</option>
																							<option value="New Caledonia">New Caledonia</option>
																							<option value="New Zealand">New Zealand</option>
																							<option value="Nicaragua">Nicaragua</option>
																							<option value="Niger">Niger</option>
																							<option value="Nigeria">Nigeria</option>
																							<option value="Niue">Niue</option>
																							<option value="Norfolk Island">Norfolk Island</option>
																							<option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
																							<option value="Northern Mariana Islands">Northern Mariana Islands</option>
																							<option value="Norway">Norway</option>
																							<option value="Oman">Oman</option>
																							<option value="Pakistan">Pakistan</option>
																							<option value="Palau">Palau</option>
																							<option value="Panama">Panama</option>
																							<option value="Papua New Guinea">Papua New Guinea</option>
																							<option value="Paraguay">Paraguay</option>
																							<option value="Peru">Peru</option>
																							<option value="Philippines">Philippines</option>
																							<option value="Pitcairn">Pitcairn</option>
																							<option value="Poland">Poland</option>
																							<option value="Portugal">Portugal</option>
																							<option value="Puerto Rico">Puerto Rico</option>
																							<option value="Qatar">Qatar</option>
																							<option value="Romania">Romania</option>
																							<option value="Russian Federation">Russian Federation</option>
																							<option value="Rwanda">Rwanda</option>
																							<option value="Reunion">Reunion</option>
																							<option value="Saint Helena, Ascension and Tristan da Cunha">Saint Helena, Ascension and Tristan da Cunha</option>
																							<option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
																							<option value="Saint Lucia">Saint Lucia</option>
																							<option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
																							<option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
																							<option value="Samoa">Samoa</option>
																							<option value="San Marino">San Marino</option>
																							<option value="Sao Tome and Principe">Sao Tome and Principe</option>
																							<option value="Saudi Arabia">Saudi Arabia</option>
																							<option value="Senegal">Senegal</option>
																							<option value="Serbia">Serbia</option>
																							<option value="Seychelles">Seychelles</option>
																							<option value="Sierra Leone">Sierra Leone</option>
																							<option value="Singapore">Singapore</option>
																							<option value="Slovakia">Slovakia</option>
																							<option value="Slovenia">Slovenia</option>
																							<option value="Solomon Islands">Solomon Islands</option>
																							<option value="Somalia">Somalia</option>
																							<option value="South Africa">South Africa</option>
																							<option value="South Georgia and the South Sandwich Islands">South Georgia and the South Sandwich Islands</option>
																							<option value="Korea, Republic of">Korea, Republic of</option>
																							<option value="South Sudan">South Sudan</option>
																							<option value="Spain">Spain</option>
																							<option value="Sri Lanka">Sri Lanka</option>
																							<option value="Sudan">Sudan</option>
																							<option value="Suriname">Suriname</option>
																							<option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
																							<option value="Swaziland">Swaziland</option>
																							<option value="Sweden">Sweden</option>
																							<option value="Switzerland">Switzerland</option>
																							<option value="Syrian Arab Republic">Syrian Arab Republic</option>
																							<option value="Taiwan">Taiwan</option>
																							<option value="Tajikistan">Tajikistan</option>
																							<option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
																							<option value="Thailand">Thailand</option>
																							<option value="Togo">Togo</option>
																							<option value="Tokelau">Tokelau</option>
																							<option value="Tonga">Tonga</option>
																							<option value="Trinidad and Tobago">Trinidad and Tobago</option>
																							<option value="Tunisia">Tunisia</option>
																							<option value="Turkey">Turkey</option>
																							<option value="Turkmenistan">Turkmenistan</option>
																							<option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
																							<option value="Tuvalu">Tuvalu</option>
																							<option value="US Virgin Islands">US Virgin Islands</option>
																							<option value="Uganda">Uganda</option>
																							<option value="Ukraine">Ukraine</option>
																							<option value="United Arab Emirates">United Arab Emirates</option>
																							<option value="United Kingdom">United Kingdom</option>
																							<option value="US Minor Outlying Islands">US Minor Outlying Islands</option>
																							<option value="Uruguay">Uruguay</option>
																							<option value="Uzbekistan">Uzbekistan</option>
																							<option value="Vanuatu">Vanuatu</option>
																							<option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
																							<option value="Venezuela, Bolivarian Republic of">Venezuela, Bolivarian Republic of</option>
																							<option value="Viet Nam">Viet Nam</option>
																							<option value="Wallis and Futuna">Wallis and Futuna</option>
																							<option value="Yemen">Yemen</option>
																							<option value="Zaire">Zaire</option>
																							<option value="Zambia">Zambia</option>
																							<option value="Zimbabwe">Zimbabwe</option>
   </select>
 <span className={styles.erorMesage}>{errors.country && touched.country && errors.country}</span>

</div>

 <div className={styles.formContainer3} >
    <input 
      type="tel" 
      name='phone' 
      value={values.phone}
      onChange={handleChange}
      className={styles.name3} 
      placeholder={t('common:3_form')} 
      />
 <span className={styles.erorMesage}>{errors.phone && touched.phone && errors.phone}</span>

    <input 
      type="email"  
      name='email' 
      value={values.email}
      onChange={handleChange}
      className={styles.name4} 
      placeholder="Email" 
      />
 <span className={styles.erorMesage}>{errors.email && touched.email && errors.email}</span>

 <input 
      type="text"  
      name='address' 
      value={values.address}
      onChange={handleChange}
      className={styles.name4} 
      placeholder={t('common:address')}
      />
 <span className={styles.erorMesage}></span>
 </div>




<div className={styles.formContainer4}>
 <input 
    className={styles.name4} 
    type="text" 
    name='message' 
    value={values.message}
    onChange={handleChange}
    placeholder={t('common:message')}
    
    />
     <span className={styles.erorMesage}>{errors.message && touched.message && errors.message}</span>

 </div>
 <div className={styles.buttonContainer} >
     <button type="submit" disabled={isSubmitting}   className={`${styles.button} hover-underline-animation`}>{t('common:button_form')}</button>
         <IconContext.Provider value={{ size:'1.6em',color:'white' }}>
       <FiArrowUpRight/>
         </IconContext.Provider>
       </div>

</form> 
       )}
     </Formik>

 

<div className={styles.iconsContainer}>
       <div className={styles.info1} >
       <IconContext.Provider value={{ color:'#ABABAB' }}>
       <FiPhone className={styles.icon}/>
         </IconContext.Provider>
     <span onClick={() => {
              navigator.clipboard.writeText("004 0368 44 10 90");
              toast.success("Tel. Copiat", {
                style: {
                  background: "#191716",
                  color: "#fff",
                },
              });
            }} className={styles.infotext}>{t('common:phone')}</span>
       </div>

    <div className={styles.info2} >
       <IconContext.Provider value={{color:'#ABABAB' }}>
       <FiMail className={styles.icon}/>
         </IconContext.Provider>
      <span  onClick={() => {
              navigator.clipboard.writeText("office@tminox.com.ro");
              toast.success("Email Copiat", {
                style: {
                  background: "#191716",
                  color: "#fff",
                },
              });
            }} className={styles.infotext}>
              office@tminox.com.ro
       </span>
     </div>

       <div className={styles.info3} >
       <IconContext.Provider value={{ color:'#ABABAB' }}>
       <FiMapPin className={styles.icon2}/>
         </IconContext.Provider>
     <span  onClick={() => {
              navigator.clipboard.writeText("Str. Fundătura Hărmanului 4, 500240 Brașov");
              toast.success("Adresa Copiat", {
                style: {
                  background: "#191716",
                  color: "#fff",
                },
              });
            }} className={styles.infotext3}>Str. Fundătura Hărmanului 4, 500240 Brașov</span>
       </div>
       
       </div>


 </div>

</div>



   );
}
 
export default Contact;