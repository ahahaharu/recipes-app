import styled from '@emotion/styled';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useAuth } from '../../context/AuthContext';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../../api/auth';
import { Lock, UserIcon } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useState } from 'react';

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
`;

const LoginCard = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: ${(props) => props.theme.borderRadius.lg};
  box-shadow: ${(props) => props.theme.shadows.md};
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 1.75rem;
  color: ${(props) => props.theme.colors.text.main};
  margin: 0;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.text.main};
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 10px 10px 40px;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

const IconPos = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${(props) => props.theme.colors.text.light};
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  background-color: #fadbd8;
  padding: 10px;
  border-radius: 4px;
  font-size: 0.9rem;
  text-align: center;
`;

const Hint = styled.div`
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.text.light};
  background: #f8f9fa;
  padding: 10px;
  border-radius: 4px;

  code {
    background: #e9ecef;
    padding: 2px 4px;
    border-radius: 2px;
    font-family: monospace;
    font-weight: bold;
  }
`;

export const Route = createFileRoute('/login/')({
  component: LoginPage,
});

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      login(data);
      navigate({ to: '/' });
    },
  });

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    mutation.mutate({ username, password });
  };

  return (
    <PageWrapper>
      <LoginCard>
        <Title>Вход в систему</Title>

        <Hint>
          Login: emilys
          <br />
          Pass: emilyspass
        </Hint>

        {mutation.isError && (
          <ErrorMessage>Неверный логин или пароль</ErrorMessage>
        )}

        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          <InputGroup>
            <Label>Имя пользователя</Label>
            <InputWrapper>
              <IconPos>
                <UserIcon size={18} />
              </IconPos>
              <Input
                type="text"
                placeholder="emilys"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </InputWrapper>
          </InputGroup>

          <InputGroup>
            <Label>Пароль</Label>
            <InputWrapper>
              <IconPos>
                <Lock size={18} />
              </IconPos>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputWrapper>
          </InputGroup>

          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Вход...' : 'Войти'}
          </Button>
        </form>
      </LoginCard>
    </PageWrapper>
  );
}
