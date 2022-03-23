import { FileTemplates } from "./file-templates.dto";
import * as moment from 'moment'

export const fileTemplates : FileTemplates[] = [
 

    { 
        filename : `alumni-${moment().format('dhhmmss')}.xlsx`,
        text : 'Alumni', //module name
        header : [
            {
                'StudentNo' : null,
            },
            {
                'BatchYr' : null,
            },
            {
                'First Name' : null,
            },
            {
                'Last Name' : null,
            },
            {
                'Middle Name' : null,
            },            
        ]            
    },

]