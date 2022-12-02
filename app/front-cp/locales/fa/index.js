const { Organization } = require('@aasaam/information');

module.exports = {
  aasaam: Organization.en,
  copyright: `Copyright ${Organization.en.name}`,
  dir: 'ltr',
  projectName: 'آنالیتیکس',
  projectShortName: `آنالیتیکس`,
  projectDescription: `تجزیه و تحلیل بازدید‌ها و رخداد‌ها`,
  projectFooter: `آنالیتیکس | کاری از ${Organization.en.name}`,
  loading: 'بارگزاری...',
  contactSupport: 'با {name} تماس بگیرید',
  telSupport: 'شماره {name}',
  pageNotFound: 'یافت نشد.',
  English: 'English',
  Persian: 'فارسی',
  // ## Login
  login: 'ورود',
  admin: 'ادمین',
  password: 'رمز عبور',
  otp: 'رمز یکبار مصرف',
  email: 'ایمیل',
  captcha: 'کد امنیتی',
  otpCode: 'رمز یکبار مصرف',
  forgotPassword: 'رمز عبور خود را فراموش کرده‌اید؟',
  forgetPassword: 'فراموشی رمز عبور',
  enterEmail: 'لطفا ایمیل خود را جهت ارسال کد وارد کنید',
  sendMeCode: 'ارسال کد',
  back: 'بازگشت',
  enterRecoverCode: 'لطفا کد دریافتی را وارد کنید',
  resendCode: 'ارسال مجدد کد؟',
  code: 'کد',
  newPassword: 'رمزعبور جدید',
  repeatPassword: 'تکرار رمزعبور',
  changePassword: 'تغییر رمزعبور',
  configTextShow: 'کد زیر را کپی کرده و در بالای صفحه استفاده کنید.',
  copyText: 'کپی',
  scriptData: 'اسکریپت آنالیتیک',

  // ## MENU
  dashboard: 'داشبورد',
  domainManagement: 'مدیریت دامنه ها',
  domainAdd: 'افزودن دامنه',
  domainList: 'لیست دامنه',
  projectManagement: 'مدیریت پروژه ها',
  projectAdd: 'افزودن پروژه',
  projectList: 'لیست پروژه',
  userManagement: 'مدیریت کاربران',
  userAdd: 'افزودن کاربر',
  userList: 'لیست کاربر',
  showProfile: 'نمایش پروفایل',
  logOut: 'خروج',
  client: 'کلاینت',

  // ## Profile
  welcome: 'خوش آمدید',
  mobile: 'موبایل',
  role: 'نقش',
  viewer: 'مشاهده کننده',
  superAdmin: 'سوپر ادمین',

  // ## DOMAIN
  domain: 'دامنه',
  wildcardDomain: 'دامنه ی وایلدکارد',
  active: 'فعال',
  remove: 'حذف',
  description: 'توضیحات',
  selectProject: 'انتخاب پروژه',
  reset: 'ازنو',
  project: 'پروژه',
  status: 'وضعیت',
  options: 'گزینه ها',
  action: 'عملیات',
  deleted: 'حذف شده',
  noResult: 'هیچ داده ای یافت نشد.',
  loadMore: 'بیشتر...',
  domainEdit: 'ویرایش دامنه',
  deleteDomain: 'حذف دامنه',

  // ## PROJECT
  title: 'عنوان',
  areYouSureDelete: 'آیا از حذف این آیتم اطمینان دارید؟',
  deleteProject: 'حذف پروژه',
  nope: 'خیر',
  publicToken: 'کد عمومی',
  primaryOwner: 'صاحب اصلی پروژه',
  selectUserSearch: 'کاربر مورد نظر را جستجو کنید',
  selectUser: 'افزودن کاربر',
  selectRules: 'انتخاب قواعد',
  showPrivateToken: 'نمایش کد خصوصی',
  createdAt: 'تاریخ ایجاد',
  users: 'کاربران',
  showPrivateTokenQuote:
    'کاربر گرامی ، جهت مشاهده ی توکن خصوصی این پروژه لطفا رمز عبور خود را وارد نمایید.',
  privateToken: 'کد خصوصی',
  close: 'بستن',
  projectEdit: 'ویرایش پروژه',
  projectNotFound: 'پروژه یافت نشد',
  deleteProjectWarning:
    'با حذف این پروژه ، تمام دامنه های آن نیز حذف خواهند شد.',
  editAcl: 'ویرایش دسترسی ها',
  userRuleNotEntered: 'قوانین کاربر وارد نشده است',

  // ## USERS
  username: 'نام کاربری',
  chooseRole: 'انتخاب نقش',
  chooseLang: 'انتخاب زبان',
  selectCountry: 'انتخاب کشور',
  mobileNumber: 'شماره موبایل',
  id: 'شناسه',
  editProfile: 'ویرایش پروفایل',
  editData: 'ویرایش اطلاعات',
  editPassword: 'ویرایش رمز عبور',
  deleteUser: 'حذف کاربر',
  otherError: 'خطایی رخ داده است',
  errMsg: 'فیلد {item} : {rule}',

  // ## UPTIME
  uptimeManagement: 'مدیریت آپتایم ها',
  uptimeAdd: 'افزودن آپتایم',
  uptimeList: 'لیست آپتایم ها',
  name: 'عنوان',
  url: 'آدرس',
  ping: 'پینگ',
  interval: 'فاصله زمانی (دقیقه)',
  noStatus: 'بدون وضعیت',
  uptimeEdit: 'ویرایش آپتایم',
  deleteUptime: 'حذف آپتایم',

  // ## Performance
  performanceManagement: 'مدیریت کارایی',
  performanceAdd: 'افزودن کارایی',
  performanceList: 'لیست کارایی',
  deletePerformance: 'حذف کارایی',
  performanceEdit: 'ویرایش کارایی',

  success: {
    WELCOME: 'خوش آمدید',
    CREATED: 'با موفقیت ایجاد شد.',
    EDITED: 'با موفقیت ویرایش شد.',
    UPDATED: 'با موفقیت بروز رسانی شد.',
    DELETED: 'با موفقیت حذف شد.',
    GENERATED_PRIVATE_TOKEN: 'کد خصوصی با موفقیت تولید شد.',
  },
  errors: {
    UNPROCESSABLE_ENTITY: 'اطلاعات وارد شده صحیح نیست.',
    DUPLICATE_ENTRY: 'این مقدار قبلا ثبت شده است.',
    NULL_ENTRY: 'مقدار وارد شده نامعتبر است.',
    NOT_ALLOWED: 'شما مجوز این کار را ندارید.',
    INVALID_OPTION: 'گزینه وارد شده نامعتبر است.',
    MIN_LENGTH: 'حداقل طول این فیلد صحیح نیست.',
    MAX_LENGTH: 'حداکثر طول این فیلد صحیح نیست.',
    INVALID_REGEX: 'فیلد صحیح نیست.',
    INVALID_PASSWORD: 'رمز عبور صحیح نیست.',
    INVALID_ROLE: 'نقش صحیح نیست.',
    INVALID_LANG: 'زبان صحیح نیست.',
    INVALID_COUNTRY: 'کشور صحیح نیست.',
    INVALID_MOBILE: 'شماره موبایل صحیح نیست.',
    INVALID_DOMAIN: 'دامنه صحیح نیست.',
    INVALID_CAPTCHA: 'کد امنیتی صحیح نیست.',
    NOT_EXIST: 'مورد انتخاب شده وجود ندارد.',
    OTHER_ERROR: 'خطایی رخ داده است.',
    FORBIDDEN: 'شما دسترسی این بخش را ندارید.',
    INVALID_PROJECT_RULE: 'قواعد صحیح نیست.',
    ISREQUIRE_FIELD: 'این فیلد ضروری است.',
    UNAUTHORIZED: 'اطلاعات شما صحیح نیست.',
    ISREQUIRE_ID: 'آیدی ضروری است.',
    ISREQUIRE_PASSWORD: 'رمز عبور ضروری است.',
  },
  // ## validations
  validations: {
    requiredProject: 'نام پروژه ضروری است.',
    objectRequired: '{item} ضروری است.',
    alpha: 'فیلد {_field_} فقط شامل حروف است.',
    alpha_num: 'فیلد {_field_} فقط شامل حروف و اعداد است.',
    alpha_dash:
      'فیلد {_field_} فقط شامل حروف و اعداد، خط تیره و خط زیر تیره است.',
    alpha_spaces: 'فیلد {_field_} فقط شامل حروف و فاصله است.',
    between: 'فیلد {_field_} باید بین {min} تا {max} باشد.',
    confirmed: 'فیلد {_field_} مطابقت ندارد.',
    digits: 'فیلد {_field_} باید شامل {digits} رقم باشد.',
    email: 'فیلد {_field_} باید یک ایمیل صحیح باشد.',
    excluded: 'فیلد {_field_} باید مخالف باشد.',
    ext: 'فیلد {_field_} باید یک فایل معتبر باشد.',
    image: 'فیلد {_field_} باید یک تصویر باشد.',
    integer: 'فیلد {_field_} باید یک عدد باشد.',
    length: 'فیلد {_field_} باید بین {min} تا {max} کاراکتر باشد.',
    max_value: 'فیلد {_field_} باید کمتر از {max} باشد.',
    max: 'فیلد {_field_} باید کمتر از {max} باشد.',
    mimes: 'فیلد {_field_} باید یک فایل معتبر باشد.',
    min_value: 'فیلد {_field_} باید بیشتر از {min} باشد.',
    min: 'فیلد {_field_} باید بیشتر از {min} باشد.',
    numeric: 'فیلد {_field_} باید یک عدد باشد.',
    one_of: 'فیلد {_field_} باید یکی از مقادیر زیر باشد: {values}',
    regex: 'فیلد {_field_} باید به صورت صحیح باشد.',
    required_if:
      'فیلد {_field_} باید در صورتی که فیلد {other} برابر باشد باید پر شود.',
    required: 'فیلد {_field_} باید پر شود.',
    url: 'فیلد {_field_} باید یک آدرس باشد.',
    passmeter: '',
  },
};
