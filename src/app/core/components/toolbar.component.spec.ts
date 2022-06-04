import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { ToolbarComponent } from "./toolbar.component";

describe("AppComponent", () => {


    beforeEach( async() => {
         TestBed.configureTestingModule({
            imports: [],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [ToolbarComponent]
        }).compileComponents();
    });

    it("should create ToolbarComponent", () => {
        const fixture = TestBed.createComponent(ToolbarComponent);
        const toobar = fixture.debugElement.componentInstance;
        expect(toobar).toBeTruthy();
    });
});

