import { NgModule } from "@angular/core";
import { DragDropModule } from "@angular/cdk/drag-drop";

import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTreeModule } from "@angular/material/tree";
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatInputModule } from "@angular/material/input";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTableModule } from "@angular/material/table";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatListModule } from "@angular/material/list";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatToolbarModule } from "@angular/material/toolbar";

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatRadioModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    DragDropModule,
    MatCardModule,
    MatExpansionModule,
    MatInputModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatChipsModule,
    MatTreeModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatTableModule,
  ],
  exports: [
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatRadioModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    DragDropModule,
    MatCardModule,
    MatExpansionModule,
    MatInputModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatChipsModule,
    MatTreeModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
  ],
})
export class MaterialModule {}
