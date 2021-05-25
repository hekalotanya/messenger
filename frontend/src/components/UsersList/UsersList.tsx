import {
  FC, useState, useEffect, useCallback,
} from 'react';
import { getUsers } from '../../helpers/getUsers';
import { UserType } from '../../typedefs/User';

interface Props {
  user: UserType
}

export const UsersList: FC<Props> = ({ user }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<UserType[]>([]);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    const data = await getUsers(user.id);

    setUsers(data);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <ul>
      {!loading && users.length > 0 && users.map((u) => (
        <li key={u.id}>
          {u.username}
        </li>
      ))}
    </ul>
  );
};
