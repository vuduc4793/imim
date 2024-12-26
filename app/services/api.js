import { apiRoot, apiRootVCCA } from './apiRoot';
import axios from 'axios';
const BASE_API_URL_VCCA = "http://vcca.gov.vn/VccaService.asmx"
//comment
export const COMMENT_TYPE_COMPANY = 2
export const COMMENT_TYPE_LAW = 1
export const COMMENT_TYPE_COMMON = 3

export const getData = () => new Promise((resolve, reject) => {
    apiRoot.get('features').then(response => {
        resolve(response);
    }).catch(error => {
        reject(error);
    });
})

export const getDataVersion = () => new Promise((resolve, reject) => {
    apiRoot.get('intro/last').then(response => {
        resolve(response);
    }).catch(error => {
        reject(error);
    });
})

//comment
export const getComments = (sourceID, sourceType) => new Promise((resolve, reject) => {
    apiRoot.get('comment/public', {
        params: {
          sourceID,
          sourceType
        }
    }).then(response => {
        resolve(response);
    }).catch(error => {
        reject(error);
    });
})

export const postComplaint = (text, mail, name, sourceType, sourceID, sourceName, nameCompany) => new Promise((resolve, reject) => {
    sourceID = "1" // hard code
    if (!sourceName) {
        sourceName = "xxx"
    }
    let data = {
        text, mail, name, sourceType, sourceID, sourceName, nameCompany
    }
    console.log("postComplaint data = ", data)
    apiRoot.post('complaint', data).then(response => {
        resolve(response);
    }).catch(error => {
        reject(error);
    });
})

export const postLawQuestion = (text, mail, name, dieuKhoanID) => new Promise((resolve, reject) => {
    let data = {
        text, mail, name, dieuKhoanID
    }
    console.log("postLawQuestion data = ", data)
    apiRoot.post('cauhoi', data).then(response => {
        resolve(response);
    }).catch(error => {
        reject(error);
    });
})

// VCCA News
export const getListNews = () => new Promise((resolve, reject) => {
    let xmls = 
    `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
        <VccaListTin1 xmlns="http://tempuri.org/" />
      </soap:Body>
    </soap:Envelope>`;
    apiRootVCCA.post(
        BASE_API_URL_VCCA, 
        xmls, 
        {
            headers: {
                "SOAPAction": "http://tempuri.org/VccaListTin1",
                "Content-Type": "text/xml; charset=utf-8",
            },
            
        }
    ).then(response => {
        console.log("getListNews response = ", response)
        resolve(response);
    }).catch(error => {
        console.log("getListNews error = ", error)
        reject(error);
    });
})

export const getNewsDetail = (id) => new Promise((resolve, reject) => {
    let xmls = 
    `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <VccaTin xmlns="http://tempuri.org/">
          <sId>${id}</sId>
        </VccaTin>
      </soap:Body>
    </soap:Envelope>`;
    apiRootVCCA.post(
        BASE_API_URL_VCCA, 
        xmls, 
        {
            headers: {
                "SOAPAction": "http://tempuri.org/VccaTin" ,
                "Content-Type": "text/xml; charset=utf-8",
            },
            
        }
    ).then(response => {
        resolve(response);
    }).catch(error => {
        reject(error);
    });
})

// VCCA Company
export const getListCompany = () => new Promise((resolve, reject) => {
    let xmls = 
    `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
        <VccaListDNBHDC xmlns="http://tempuri.org/" />
    </soap:Body>
    </soap:Envelope>`;
    apiRootVCCA.post(
        BASE_API_URL_VCCA, 
        xmls, 
        {
            headers: {
                "SOAPAction": "http://tempuri.org/VccaListDNBHDC",
                "Content-Type": "text/xml; charset=utf-8",
            },
            
        }
    ).then(response => {
        resolve(response);
    }).catch(error => {
        reject(error);
    });
})

export const getCompanyDetail = (sId) => new Promise((resolve, reject) => {
    let xmls = 
    `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
    <VccaDNBHDCDetail xmlns="http://tempuri.org/">
        <sId>${sId}</sId>
    </VccaDNBHDCDetail>
    </soap:Body>
    </soap:Envelope>`;
    apiRootVCCA.post(
        BASE_API_URL_VCCA, 
        xmls, 
        {
            headers: {
                "SOAPAction": "http://tempuri.org/VccaDNBHDCDetail",
                "Content-Type": "text/xml; charset=utf-8",
            },
            
        }
    ).then(response => {
        resolve(response);
    }).catch(error => {
        reject(error);
    });
})

export const getCompanyHoSo = (sId) => new Promise((resolve, reject) => {
    let xmls = 
    `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
    <VccaDNBHDCHoso xmlns="http://tempuri.org/">
        <sId>${sId}</sId>
    </VccaDNBHDCHoso>
    </soap:Body>
    </soap:Envelope>`;
    apiRootVCCA.post(
        BASE_API_URL_VCCA, 
        xmls, 
        {
            headers: {
                "SOAPAction": "http://tempuri.org/VccaDNBHDCHoso",
                "Content-Type": "text/xml; charset=utf-8",
            },
            
        }
    ).then(response => {
        resolve(response);
    }).catch(error => {
        reject(error);
    });
})

export const getCompanyAgency = (sId) => new Promise((resolve, reject) => {
    let xmls = 
    `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
    <VccaDNBHDCChinhanh xmlns="http://tempuri.org/">
        <sId>${sId}</sId>
    </VccaDNBHDCChinhanh>
    </soap:Body>
    </soap:Envelope>`;
    apiRootVCCA.post(
        BASE_API_URL_VCCA, 
        xmls, 
        {
            headers: {
                "SOAPAction": "http://tempuri.org/VccaDNBHDCChinhanh",
                "Content-Type": "text/xml; charset=utf-8",
            },
            
        }
    ).then(response => {
        resolve(response);
    }).catch(error => {
        reject(error);
    });
})

export const getCompanyOwner = (sId) => new Promise((resolve, reject) => {
    let xmls = 
    `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
    <VccaDNBHDCChusohuu xmlns="http://tempuri.org/">
        <sId>${sId}</sId>
    </VccaDNBHDCChusohuu>
    </soap:Body>
    </soap:Envelope>`;
    apiRootVCCA.post(
        BASE_API_URL_VCCA, 
        xmls, 
        {
            headers: {
                "SOAPAction": "http://tempuri.org/VccaDNBHDCChusohuu",
                "Content-Type": "text/xml; charset=utf-8",
            },
            
        }
    ).then(response => {
        resolve(response);
    }).catch(error => {
        reject(error);
    });
})

export const getCompanyRepresentative = (sId) => new Promise((resolve, reject) => {
    let xmls = 
    `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
    <VccaDNBHDCNguoidaidien xmlns="http://tempuri.org/">
        <sId>${sId}</sId>
    </VccaDNBHDCNguoidaidien>
    </soap:Body>
    </soap:Envelope>`;
    apiRootVCCA.post(
        BASE_API_URL_VCCA, 
        xmls, 
        {
            headers: {
                "SOAPAction": "http://tempuri.org/VccaDNBHDCNguoidaidien",
                "Content-Type": "text/xml; charset=utf-8",
            },
            
        }
    ).then(response => {
        resolve(response);
    }).catch(error => {
        reject(error);
    });
})
