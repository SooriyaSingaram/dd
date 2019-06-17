export class Widgets {
    chartHeading: String;
    customeHeading:String;
    row: String;
    column: String;
    chartType: String;
    graphDefinition: String;
    customDefinition:String;
    chartField: any[] = [];
    summaryByFields: any[] = [];
    userFilter: any;
    percentFilter: any;
    exportCSV: boolean;
    exportPDF: boolean;
    exportMail: boolean;

}

export class Templates {
    templateName: String;
    customeTemplateName:String;
    templateDefinition: string;
    customTemplateDesc:String;
    dashboardName: String;
    customDashboardName:String;
    emailData: any;    
    templateType: String;
    table: String;
    filterOption: any;
    widget: any = [];
    _id: String;
    pageExport: boolean;
    mailDashboard: boolean;
    contentFilter: any = [];
    defaultFilter: any;

}

export class Customization {
    templateName: String;
    templateDefinition: String;
    dashboardName: String;
    chartHeading: String;
    graphDefinition: String;
    row: String;
    column: String;
    chartType: String;
    chartField: any[] = [];
    emailData: any;    
    
}



