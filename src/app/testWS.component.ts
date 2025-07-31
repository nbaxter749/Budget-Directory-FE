import { Component } from '@angular/core';
import { WebService } from './web.service';

@Component({
    selector: 'testWS',
    standalone: true,
    providers: [WebService],
    templateUrl: './testWS.component.html'
})
export class TestWSComponent {

    test_output: string[] = [];
    first_business_list: any[] = [];
    second_business_list: any[] = [];
    
    constructor(private webService: WebService) {}

    private testBusinessesFetched() {
        this.webService.getBusinessesPage(1)
        .subscribe( (response) => {
            if (Array.isArray(response) && response.length == 4)
                this.test_output.push("Page of businesses fetched... PASS");
             else 
                this.test_output.push("Page of businesses fetched... FAIL");
            })
        }

    private testPagesOfBusinessesAreDifferent() {
        this.webService.getBusinessesPage(1)
            .subscribe( (response) => {
                this.first_business_list = response;
                this.webService.getBusinessesPage(2)
                    .subscribe( (response) => {
                        this.second_business_list = response;
                        if (this.first_business_list[0]["_id"] != this.second_business_list[0]["_id"])
                            this.test_output.push("Pages 1 and 2 are different... PASS");
                        else
                            this.test_output.push("Pages 1 and 2 are different... FAIL");
                    })
            })
    }

    private testGetBusiness() {
        this.webService.getBusiness('67282e7643ddadda742694b4')
            .subscribe( (response) => {
                if (response.name == 'Biz 0')
                    this.test_output.push("Fetch Biz 0 by ID... PASS");
                else
                    this.test_output.push("Fetch Biz 0 by ID... FAIL");
            })
    }

    private testGetReviews() {
        this.webService.getReviews('67282e7643ddadda742694b4')
            .subscribe( (response) => {
                if (Array.isArray(response))
                    this.test_output.push("Fetch Reviews of Biz 0... PASS");
                else
                    this.test_output.push("Fetch Reviews of Biz 0... FAIL");
            })
    }

    private testPostReview() {
        let test_review = {
            "username" : "Test User",
            "comment" : "Test Comment",
            "stars" : 5
        };
        this.webService.getReviews('67282e7643ddadda742694b4')
            .subscribe( (response) => {
                let numReviews = response.length;
                this.webService.postReview('67282e7643ddadda742694b4', test_review)
                    .subscribe( (response) => {
                this.webService.getReviews('67282e7643ddadda742694b4')
                    .subscribe( (response) => {
                        if (response.length == numReviews + 1)
                            this.test_output.push("Post review... PASS");
                        else
                            this.test_output.push("Post review... FAIL");
                    })
                })
        })
    }
    
    ngOnInit() {
        this.testBusinessesFetched();
        this.testPagesOfBusinessesAreDifferent();
        this.testGetBusiness();
        this.testGetReviews();
        this.testPostReview();
    }
}
