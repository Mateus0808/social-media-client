import { Form } from '@unform/web'
import { Input } from '../../components/Input'
import { Label } from '../../components/Label'
import { Select } from '../../components/Select'
import { useRef, useState } from 'react'
import { createUserService } from '../../services/user/create-user.service'
import { CreateUserParams } from '../../services/user/type/create-user.interface'
import { useAuthenticated } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export const RegisterPage = () => {
  const { signIn } = useAuthenticated()
  const formRef = useRef(null)
  const [error, setError] = useState<string>('')
  const navigate = useNavigate()

  async function handleSubmit(data: CreateUserParams) {
    const createdUser = await createUserService(data)
    if (createdUser.error) {
      setError(createdUser.data)
      return
    }
    await signIn({
      email: createdUser.data.email,
      password: data.password,
    })
  }

  return (
    <div className="flex justify-between bg-white rounded shadow p-8 w-full">
      <div>
        <img
          src="/register-image.png"
          alt="Imagem de exemplo"
          width={400}
          height={400}
          className="w-full h-auto"
        />
      </div>
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        className="w-96 p-6 bg-white rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-bold mb-6">Cadastre-se</h1>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name" label="Nome" />
            <Input type="text" name="name" placeholder="Digite seu nome" />
          </div>
          <div>
            <Label htmlFor="lastName" label="Sobrenome" />
            <Input
              type="text"
              name="lastName"
              placeholder="Digite seu sobrenome"
            />
          </div>
        </div>
        <div className="mb-4">
          <Label htmlFor="email" label="Email" />
          <Input type="email" name="email" placeholder="Digite seu email" />
        </div>
        <div className="mb-4">
          <Label htmlFor="birthDate" label="Data de Nascimento" />
          <Input type="date" name="birthDate" />
        </div>
        <div className="mb-4">
          <Label htmlFor="maritalStatus" label="Estado Civil" />
          <Select id="maritalStatus" name="maritalStatus">
            <option value="">Selecione o estado civil</option>
            <option value="single">Solteiro (a)</option>
            <option value="married">Casado (a)</option>
            <option value="divocied">Divorciado (a)</option>
            <option value="viuvo">Viúvo (a)</option>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone" label="Telefone" />
            <Input type="tel" name="phone" placeholder="(99) 9 9999-9999" />
          </div>
          <div>
            <Label htmlFor="username" label="Nome do usuário" />
            <Input type="text" name="username" placeholder="Nome de usuário" />
          </div>
        </div>
        <div className="mb-4">
          <Label htmlFor="gender" label="Gênero" />
          <Select id="gender" name="gender">
            <option value="">Selecione o gênero</option>
            <option value="MALE">Masculino</option>
            <option value="FEMALE">Feminino</option>
            <option value="OTHER">Outro</option>
          </Select>
        </div>
        <div className="mb-4">
          <Label htmlFor="password" label="Senha" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
        </div>
        <div className="mb-6">
          <Label htmlFor="confirmPassword" label="Confirmar Senha" />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirme sua senha"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cadastrar
          </button>
          <button
            onClick={() => navigate('/')}
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            Já possui uma conta? Faça login
          </button>
        </div>
      </Form>
    </div>
  )
}
