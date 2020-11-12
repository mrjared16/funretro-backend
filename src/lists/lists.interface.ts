import { ListDTO } from 'src/lists/lists.dto';

export interface ListResponse {
    response: {
        list: ListDTO
    }
}
