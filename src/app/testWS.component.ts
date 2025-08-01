import { Component, OnInit } from '@angular/core';
import { WebService } from './web.service';

@Component({
    selector: 'testWS',
    standalone: true,
    providers: [WebService],
    templateUrl: './testWS.component.html'
})
export class TestWSComponent implements OnInit {

    test_output: string[] = [];
    first_budget_list: any[] = [];
    second_budget_list: any[] = [];

  /**
   * The constructor for the TestWS Component
   * @param webService Injecting the WebService for API testing
   */
  constructor(private webService: WebService) {}

    private testBudgetsFetched() {
        this.webService.getBudgetsPage(1)
        .subscribe( (response) => {
        if (Array.isArray(response) && response.length == 4)
            this.test_output.push("Page of budgets fetched... PASS");
        else
            this.test_output.push("Page of budgets fetched... FAIL");
        })
    }

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

    private testGetBudget() {
        this.webService.getBudget('67282e7643ddadda742694b4') // Hardcoded ID for testing
            .subscribe( (response) => {
                if (response.username)
                    this.test_output.push("Fetch budget by ID... PASS");
                else
                    this.test_output.push("Fetch budget by ID... FAIL");
            })
    }

    ngOnInit() {
        this.testBudgetsFetched();
        this.testPagesOfBudgetsAreDifferent();
        this.testGetBudget();
    }
}
