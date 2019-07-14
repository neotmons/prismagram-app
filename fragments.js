import {gql} from "apollo-boost";

export const POST_FRAGMENT = gql`
    fragment PostParts on Post {
        id
        location
        caption
        user {
            id
            avatar
            name
        }
        files {
            id
            url
        }
        likeCount
        isLiked
        comments {
            id
            text
            user {
                id
                avatar
                name
            }
        }
        createdAt        
    }
`;