import { Visibility } from "../../domain/enums/project-enum"

export type ProjectSchema = {
    id: string
    api_key_hash: string
    client_host: string
    owner_id: string
    title: string
    visibility: Visibility
    created_at?: any
}