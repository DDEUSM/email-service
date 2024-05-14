import axios from "axios"
import { Visibility } from "../../../../domain/enums/project-enum"
import { host, port } from "../../../../env"

// npx jest src/infrastructure/routes/internal-routes/project-routes/project-routes.spec.ts

describe("Project Routes Integration tests", () => 
{
    let newProject = {
        apiKey: 't0b77de101e00?4d4e%8652%b6527fe4b0t9',
        clientHost: "http://localhost:2400",
        ownerId: '705a391e-d532-4eed-a0e2-3309c97f4d21',
        title: 'project test',
        visibility: Visibility.public
    }

    const URL_BASE = "http://"+host+":"+port 

    test("test #1: Create new project", async () => 
    {
        const res: any = await axios.post(
            URL_BASE+"/projects",
            newProject,
            { 
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).catch(error => console.log(error))
        expect(res.status).toBe(201)
    })

    test("test #2: Find project by query strings", async () => 
    {
        const res: any = await axios.get (
            URL_BASE+"/projects?"+ new URLSearchParams ({
                title: newProject.title,
                visibility: newProject.visibility,
                offset: "0",
                limit: "10",
            })
        ).catch(error => console.log(error))

        expect(res.data[0].title).toBe(newProject.title)
        expect(res.data[0].visibility).toBe(newProject.visibility)

        newProject["id"] = res.data[0].id
    })

    test("test #3: Find project by id", async () => 
    {
        const response: any = await fetch(
            URL_BASE+"/projects/"+newProject["id"],
            {
                method: "GET",
            }
        )
        .catch(error => console.log(error))

        const res = await response.json()

        expect(res.title).toBe(newProject.title)
        expect(res.visibility).toBe(newProject.visibility)
    })

    test("test #4: Update the project", async () => 
    {
       newProject.title = "new project title 2.0"
        const res: any = await axios.put(
            URL_BASE+"/projects/"+newProject["id"],
            { title: newProject.title },
            { 
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        .catch(error => console.log(error))

        expect(res.status).toBe(204)
    })

    test("test #5: Find project by id after update", async () => 
    {
        const response: any = await fetch(
            URL_BASE+"/projects/"+newProject["id"],
            {
                method: "GET",
            }
        )
        .catch(error => console.log(error))

        const res = await response.json()

        expect(res.title).toBe(newProject.title)
        expect(res.visibility).toBe(newProject.visibility)
    })

    test("test #6: Delete the project", async () => 
    {
        const res: any = await fetch(
            URL_BASE+"/projects/"+newProject["id"],
            { method: "DELETE" }
        )
        .catch(error => console.log(error))

        expect(res.ok).toBeTruthy()
    })

    test("test #7: Try to find the Project by Id after deletion", async () => 
    {
        const res: any = await fetch(
            URL_BASE+"/projects/"+newProject["id"],
            {
                method: "GET",
            }
        )
        .catch(error => console.log(error))

        expect(res.ok).toBeFalsy()
    })
})