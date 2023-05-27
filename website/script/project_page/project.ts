var projectCount = qSelAll<HTMLElement>(".project").length
qSel<HTMLElement>("#number_of_projects").replace({
    "num_of_projects": projectCount.toString()
})