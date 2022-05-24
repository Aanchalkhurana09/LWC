import { LightningElement,track,api,wire} from 'lwc';
import getProposalList from '@salesforce/apex/getProposals.getProposalList'
import getLineItems from '@salesforce/apex/getProposals.getLineItems'


const columns=[
    {label: 'Base Price', fieldName: 'BasePrice__c'},
    {label: 'Acceptance Date', fieldName: '	Acceptance_Date__c'},
    

]

const columns1 =[
    {label: 'Base Price', fieldName: 'BasePrice__c'},
    {label: 'Acceptance Date', fieldName: '	Acceptance_Date__c'},
    

]


export default class CompareLineItems extends LightningElement {

    // value='';
   //  value1='';
   selectedValueLeft='';
   selectedValueRight='';
 
    
    accOptions=[];
    cardVisible=false;
   columnsField=columns;
   columnsData=columns1;
   
    dataLeft=[];
    dataRight=[];
    
    @api recordId;
   

    get options(){
        return this.accOptions;
    }

    connectedCallback(){
        getProposalList({lwcRecordId: this.recordId})
        .then(result=>{          
            let arr=[];
            for(var i=0; i<result.length;i++){
                arr.push({label: result[i].Name, value:result[i].Id})
            }
            this.accOptions=arr;
        })
    }

    

UpdateLeftValues(event){
    this.selectedValueLeft=event.target.value;
}

UpdateRightValues(event){
    this.selectedValueRight=event.target.value;
}


    

    handleClick(event){
        this.cardVisible=true;
        this.loadLeftItems();
        this.loadRightItems();
  }

  loadLeftItems(){
    getLineItems({selectedProposal: this.selectedValueLeft})
    .then(response=>{
       // this.dataLeft=response;
       this.dataLeft.push(response);
    })
    .catch(error=>{
        window.alert("Some error occured")
    })

  }

  loadRightItems(){
    getLineItems({selectedProposal: this.selectedValueRight})
    .then(response=>{
       // this.dataRight=response;
       this.dataRight.push(response);
        
        console.log("response"+JSON.parse(response.data))
    })
    .catch(error=>{
        window.alert("Some error occured")
    })

  }

}
