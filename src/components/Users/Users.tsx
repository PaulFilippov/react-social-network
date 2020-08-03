import React, {FC} from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UserType} from "../../types/Types";

type PropsType = {
    currentPage: number,
    totalUsersCount: number,
    pageSize: number,
    onPageChanged: (pageNumber: number) => void,
    users: Array<UserType>,
    followingInProgress: Array<number>,
    unFollow: (userId: number) => void,
    follow: (userId: number) => void
}

let Users: FC<PropsType> = ({
                 currentPage,
                 totalUsersCount,
                 pageSize,
                 onPageChanged,
                 users,
                 ...props
             }) => {
    return (<div>
            <Paginator currentPage={currentPage}
                       onPageChanged={onPageChanged}
                       totalItemsCount={totalUsersCount}
                       pageSize={pageSize}
            />
            <div>
                {
                    users.map(u => <User user={u}
                                               key={u.id}
                                               followingInProgress={props.followingInProgress}
                                               unFollow={props.unFollow}
                                               follow={props.follow}
                    />)
                }
            </div>
        </div>
    );
}


export default Users;