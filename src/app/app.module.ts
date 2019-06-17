import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropDirectiveModule } from "angular4-drag-drop";
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { HttpModule, Http, Response } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router';
import { CommonModule,DatePipe } from '@angular/common';
import { TooltipModule,BsDatepickerModule } from 'ngx-bootstrap';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { MatSelectModule, MatSortModule } from '@angular/material';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { GenericBoxModule } from './generic-box/generic-box.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';

import { ItSideBarComponent } from './IT-Admin/it-side-bar/it-side-bar.component';
import { ItHeaderComponent } from './IT-Admin/it-header/it-header.component';
import { ItFooterComponent } from './IT-Admin/it-footer/it-footer.component';
import { ItAddUserComponent } from './IT-Admin/it-add-user/it-add-user.component';
import { ItAdminLayoutComponent } from './IT-Admin/it-admin-layout/it-admin-layout.component';
import { ItAdminUserlistComponent } from './IT-Admin/it-admin-userlist/it-admin-userlist.component';
import { ApicallService } from './services/apicall.service'
import { ChartService } from './services/chart.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AddOrganizationComponent } from './super-admin/add-organization/add-organization.component';
import { OrganizationListComponent } from './super-admin/organization-list/organization-list.component';
import { SuperAdminHeaderComponent } from './super-admin/super-admin-header/super-admin-header.component';
import { SuperAdminFooterComponent } from './super-admin/super-admin-footer/super-admin-footer.component';
import { SuperAdminSidebarComponent } from './super-admin/super-admin-sidebar/super-admin-sidebar.component';
import { AddUserComponent } from './super-admin/add-user/add-user.component';
import { UserListComponent } from './super-admin/user-list/user-list.component';
import { ModelDataService } from './services/model-data.service';
import { AlertModule } from 'ngx-alerts';

import { Temp1Theme1Component } from './templates/temp1-theme1/temp1-theme1.component';
import { TriggerComponent } from './super-admin/trigger/trigger.component';
import { UserRoleListComponent } from './super-admin/user-role/user-role-list.component';
import { CreateTemplateComponent } from './super-admin/create-template/create-template.component';
import { CreateuserComponent } from './templates/createuser/createuser.component';
import { HomePageComponent } from './templates/home-page/home-page.component'
import { AuthGuard } from './services/auth.guard';

import { TemplateComponent } from './super-admin/template/template.component';
import { EditorganisationComponent } from './IT-Admin/editorganisation/editorganisation.component';
import { UserprofileComponent } from './templates/userprofile/userprofile.component';
import { CreateadminComponent } from './IT-Admin/createadmin/createadmin.component';
import { DashboardSidebarComponent } from './templates/dashboard-sidebar/dashboard-sidebar.component';
import { DashboardHeaderComponent } from './templates/dashboard-header/dashboard-header.component';
import { TriggerListComponent } from './Super-Admin/trigger-list/trigger-list.component';
import { Template2Component } from './super-admin/template/template2/template2.component';
import { Template4Component } from './super-admin/template/template4/template4.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AdminchangepasswordComponent } from './IT-Admin/adminchangepassword/adminchangepassword.component';
import { EditTemplateComponent } from './super-admin/edit-template/edit-template.component';
import { TemplateListComponent } from './super-admin/template-list/template-list.component';
// import { NotificationMessageComponent } from './Notification/notification-message/notification-message.component';
import { EdittriggerComponent } from './super-admin/edittrigger/edittrigger.component';
import { ActivitylogComponent } from './super-admin/activitylog/activitylog.component';
import { NewTemplateComponent } from './super-admin/template/new-template/new-template.component';
import { GlobalValuesComponent } from './super-admin//global-values/global-values.component';
import { CustomTemplateComponent } from './super-admin/custom-template/custom-template.component';
import { CustomizedTemplateComponent } from './templates/customized-template/customized-template.component';
import { EmailCustomizationComponent } from './super-admin/email-customization/email-customization.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: LoginComponent},
  { path: 'super-admin', component: SuperAdminComponent, canActivate:[AuthGuard] },
  { path: 'global-values', component: GlobalValuesComponent, canActivate:[AuthGuard] },  
  { path: 'it-admin-adduser/:id', component: ItAddUserComponent, canActivate:[AuthGuard] },
  { path: 'it-admin-userlist', component: ItAdminUserlistComponent,canActivate:[AuthGuard]  },
  { path: 'it-admin-layout', component: ItAdminLayoutComponent, canActivate:[AuthGuard] },
  { path: 'forgotpassword', component: ForgotPasswordComponent},
  { path: 'changepassword/:id', component: ChangePasswordComponent, canActivate:[AuthGuard] },

  { path: 'organizationlist', component: OrganizationListComponent , canActivate:[AuthGuard]},
  { path: 'addorganization/:id', component: AddOrganizationComponent , canActivate:[AuthGuard]},
  { path: 'adduser/:id', component: AddUserComponent , canActivate:[AuthGuard]},
  { path: 'userlist', component: UserListComponent , canActivate:[AuthGuard]},
  { path: 'temp1_theme1/:id', component:Temp1Theme1Component, canActivate:[AuthGuard] },

  { path: 'trigger/:id', component: TriggerComponent},
  { path: 'edittrigger/:id', component: EdittriggerComponent },
  { path: 'createstandarduser', component: CreateuserComponent , canActivate:[AuthGuard]},
  { path: 'homepage', component: HomePageComponent , canActivate:[AuthGuard]},
  { path: 'adminmanagement/:id', component: CreateadminComponent , canActivate:[AuthGuard]},

   { path: 'template', component: TemplateComponent, canActivate:[AuthGuard] },
   { path: 'editorg', component: EditorganisationComponent, canActivate:[AuthGuard] },

   { path: 'userprofile/:id', component: UserprofileComponent, canActivate:[AuthGuard] },
   { path: 'userrolelist', component: UserRoleListComponent, canActivate:[AuthGuard] },
   { path: 'create_template/:id', component: CreateTemplateComponent, canActivate:[AuthGuard] },
   { path: 'trigger-list', component: TriggerListComponent },
   { path: 'template2', component: Template2Component, canActivate:[AuthGuard] },
   { path: 'template4', component: Template4Component, canActivate:[AuthGuard] },
   { path: 'new-template', component: NewTemplateComponent, canActivate:[AuthGuard] },
   
   { path: 'reset-password/:id', component: ResetPasswordComponent },
   { path: 'adminchangepassword', component: AdminchangepasswordComponent, canActivate:[AuthGuard] },
   { path: 'template-list', component: TemplateListComponent, canActivate:[AuthGuard] },
   { path: 'edit-template/:id', component: EditTemplateComponent, canActivate:[AuthGuard] },
   { path: 'custom-template/:id', component: CustomTemplateComponent, canActivate:[AuthGuard] },   
   { path: 'activitylog', component: ActivitylogComponent, canActivate:[AuthGuard] },
   { path: 'customized-template/:id', component: CustomizedTemplateComponent, canActivate:[AuthGuard]},
   { path: 'email-template', component: EmailCustomizationComponent, canActivate:[AuthGuard] }

]

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{ useHash: true }),
    GenericBoxModule,
    DragDropDirectiveModule,
    Ng2Charts,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMultiSelectModule,
    TooltipModule.forRoot(),
    NgxPaginationModule,
    OrderModule,
    MatSelectModule,
    BrowserAnimationsModule,NgxSpinnerModule,
  AlertModule.forRoot({maxMessages: 1, timeout: 3000}),BsDatepickerModule.forRoot()
  ],

  declarations: [
    AppComponent,
    LoginComponent,
    SuperAdminComponent,
    ItSideBarComponent,
    ItHeaderComponent,
    ItFooterComponent,
    ItAddUserComponent,
    ItAdminLayoutComponent,
    ItAdminUserlistComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    AddOrganizationComponent,
    OrganizationListComponent,
    SuperAdminHeaderComponent,
    SuperAdminFooterComponent,
    SuperAdminSidebarComponent,
    AddUserComponent,
    UserListComponent,
    Temp1Theme1Component,

    TriggerComponent,
    CreateuserComponent,
    HomePageComponent,
    UserRoleListComponent,
    CreateTemplateComponent,
    TemplateComponent,
    EditorganisationComponent,
    UserprofileComponent,
    CreateadminComponent,

    DashboardSidebarComponent,
    DashboardHeaderComponent,
    TriggerListComponent,
    Template2Component,
    Template4Component,
    ResetPasswordComponent,
    AdminchangepasswordComponent,
    EditTemplateComponent,
    TemplateListComponent,
      // NotificationMessageComponent,
    EdittriggerComponent,
      ActivitylogComponent,
      NewTemplateComponent,
      GlobalValuesComponent,
      CustomTemplateComponent,
      CustomizedTemplateComponent,
      EmailCustomizationComponent
    

  ],
  bootstrap: [AppComponent],
  providers: [ApicallService, ChartService, ModelDataService,AuthGuard ,DatePipe],

})
export class AppModule { }
