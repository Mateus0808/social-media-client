import { Form } from '@unform/web'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Label } from '../../components/Label'
import { useAuthenticated } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

interface LoginProps {
  email: string
  password: string
}

export const LoginPage = () => {
  const { signIn } = useAuthenticated()
  const navigate = useNavigate()

  const handleSubmit = async (data: LoginProps) => {
    await signIn(data)
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Form
        onSubmit={handleSubmit}
        className="w-96 p-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <div className="mb-4">
          <Label label="Email" htmlFor="email" />
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-6">
          <Label label="Password" htmlFor="password" />
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
          />
        </div>

        <div className="flex-col items-center justify-between">
          <Button title="Sign In" type="submit" />
          <div className="flex justify-between mt-2">
            <a
              href="#"
              className="text-sm text-blue-500 hover:text-blue-700 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            >
              Esqueceu a senha?
            </a>
            <button
              onClick={() => navigate('/cadastro')}
              className="text-sm text-blue-500 hover:text-blue-700 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            >
              Cadastre-se
            </button>
          </div>
        </div>
      </Form>
    </div>
  )
}
