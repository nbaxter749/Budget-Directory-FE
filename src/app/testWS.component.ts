import { Component, OnInit } from '@angular/core';
import { WebService } from './web.service';

/**
 * The TestWS Component provides testing functionality for the WebService
 * by executing various API calls and displaying the results.
 */
@Component({
    selector: 'testWS',
    standalone: true,
    providers: [WebService],
    templateUrl: './testWS.component.html'
})
export class TestWSComponent implements OnInit {

    /**
     * Array containing the test output messages
     */
    test_output: string[] = [];

    /**
     * Array containing the first page of budget data for comparison
     */
    first_budget_list: any[] = [];

    /**
     * Array containing the second page of budget data for comparison
     */
    second_budget_list: any[] = [];

    /**
     * The constructor for the TestWS Component
     * @param webService Injecting the WebService for API testing
     */
    constructor(private webService: WebService) {}

    /**
     * Test the getBudgetsPage method by fetching paginated budgets
     * and adding the result to the test output
     */
    private testBudgetsFetched() {
        this.webService.getBudgetsPage(1)
        .subscribe( (response) => {
        if (Array.isArray(response) && response.length == 4)
            this.test_output.push("Page of budgets fetched... PASS");
        else
            this.test_output.push("Page of budgets fetched... FAIL");
        })
    }

    /**
     * Test pagination by comparing pages 1 and 2
     * and adding the result to the test output
     */
    private testPagesOfBudgetsAreDifferent() {
        this.webService.getBudgetsPage(1)
            .subscribe( (response) => {
                this.first_budget_list = response;
                this.webService.getBudgetsPage(2)
                    .subscribe( (response) => {
                        this.second_budget_list = response;
                        if (this.first_budget_list[0]["_id"] != this.second_budget_list[0]["_id"])
                            this.test_output.push("Pages 1 and 2 are different... PASS");
                        else
                            this.test_output.push("Pages 1 and 2 are different... FAIL");
                    })
            })
    }

    /**
     * Test the getBudget method by fetching a specific budget
     * and adding the result to the test output
     */
    private testGetBudget() {
        this.webService.getBudget('67282e7643ddadda742694b4') // Hardcoded ID for testing
            .subscribe( (response) => {
                if (response.username)
                    this.test_output.push("Fetch budget by ID... PASS");
                else
                    this.test_output.push("Fetch budget by ID... FAIL");
            })
    }

    /**
     * Test the getReviews method by fetching reviews for a budget
     * and adding the result to the test output
     */
    private testGetReviews() {
        this.webService.getReviews('67282e7643ddadda742694b4')
            .subscribe( (response) => {
                if (Array.isArray(response))
                    this.test_output.push("Fetch reviews of budget... PASS");
                else
                    this.test_output.push("Fetch reviews of budget... FAIL");
            })
    }

    /**
     * Test the postReview method by adding a new review
     * and adding the result to the test output
     */
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

    /**
     * Initialize the component by running all test methods
     */
    ngOnInit() {
        this.testBudgetsFetched();
        this.testPagesOfBudgetsAreDifferent();
        this.testGetBudget();
        this.testGetReviews();
        this.testPostReview();
    }
}
