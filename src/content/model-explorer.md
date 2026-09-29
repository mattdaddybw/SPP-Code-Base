---
layout: layouts/base.njk
title: Model Explorer
---
## How the Model Works

This page explains the statistical model used in the School Progress Project. The goal is to show how reading proficiency is related to school poverty, district elementary-school structure, and other school characteristics.

Start with the plain-language version of the model below.

## Plain-Language Model

Reading proficiency = baseline level + district structure + poverty + district structure x poverty + charter status + other school factors + missing-data adjustments 

## Statistical Model

Per_Proficient = intercept + small_1to3 + Per_FRPL_c_imp + small_1to3:Per_FRPL_c_imp + is_charter + Total_Enroll + Per_Stu_of_Colr + Per_ELL_imp + Per_SpEd_imp + FRPL_miss + ELL_miss + SpEd_miss 

## Parts of the Model

Click a term to learn what it does in the model.

* Core explanatory terms
    * Per_Proficient : outcome variable
    * intercept : starting predicted reading proficiency before the other terms adjust it
    * small_1to3 : district with 1 to 3 elementary schools
    * Per_FRPL_c_imp : school poverty level, centered at the mean
    * small_1to3 x Per_FRPL_c_imp : interaction between district structure and poverty

* School context controls

    * Total_Enroll : school enrollment
    * Per_Stu_of_Colr : percent students of color
    * Per_ELL_imp : percent English Learners
    * Per_SpEd_imp : percent special education
    * is_charter : charter school indicator

* Missing-data adjustments

    * FRPL_miss : indicator for missing FRPL before imputation
    * ELL_miss : indicator for missing ELL before imputation
    * SpEd_miss : indicator for missing special education before imputation

## Predicted Proficiency by Poverty and District Structure

This figure shows the model's predicted relationship between poverty and reading proficiency for districts with 1 to 3 elementary schools versus districts with 4 or more elementary schools.

The two fitted lines illustrate the central interaction in the model: predicted proficiency declines as poverty rises, but the decline is less steep in smaller district structures.

[PLOT]

## Final Model Results

This section presents the coefficient table and summary statistics for the final model. Hover over a term name in the coefficient table for a short statistical interpretation.

[COEFFICIENT TABLE]

## How the Story Builds Across Models

The final model was built in stages to show how the main relationship changes as district structure, the interaction term, and additional controls are added.

[TABLE]

## Project Materials

These documents provide additional transparency about the data, cleaning steps, and full analysis.

* Data Dictionary
* Data Cleaning Log
* Full Analysis Report
* GitHub Repository

## How to Interpret the Model Responsibly

* This is an observational model, not a causal proof.
* Coefficients describe conditional relationships, holding other included variables constant.
* The interaction term describes a difference in slope, not a universal advantage at every poverty level.
* Residual performance groups show how schools perform relative to the model, not an absolute judgment of school quality.
