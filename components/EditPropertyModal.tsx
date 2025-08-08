import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { motion } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Interface alinhada com a API e o formulário
interface Property {
  id: number;
  usuario_id: number;
  tipo_imovel: string;
  cep: string;
  endereco: string;
  complemento?: string | null;
  cidade: string;
  estado: string;
  bairro: string;
  area: number;
  quartos: number;
  banheiros: number;
  garagem: number;
  descricao: string;
  fotos: string[] | null;
  valor_agio: number;
  valor_parcela_atual: number;
  parcelas_restantes: number;
  valor_total_financiado: number;
  status?: 'ativo' | 'pausado' | 'vendido';
  created_at?: string;
}

// Props do Modal, com onSave assíncrono
interface EditPropertyModalProps {
  property: Property;
  onClose: () => void;
  onSave: (formData: FormData) => Promise<void>;
}

export default function EditPropertyModal({ property, onClose, onSave }: EditPropertyModalProps) {
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<Property>({ defaultValues: property });

  const [currentPhotos, setCurrentPhotos] = useState<string[]>(property.fotos || []);
    const [newPhotos, setNewPhotos] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    reset(property);
    setCurrentPhotos(property.fotos || []);
  }, [property, reset]);

  const handlePhotoDelete = (photoUrl: string) => {
    setCurrentPhotos(currentPhotos.filter(url => url !== photoUrl));
  };

  const handleNewPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewPhotos(Array.from(e.target.files));
    }
  };

  const onSubmit = (data: Property) => {
    const formData = new FormData();

    // Adiciona todos os campos do formulário ao FormData
    Object.keys(data).forEach(key => {
      const formKey = key as keyof Property;
      if (formKey !== 'fotos' && data[formKey] !== null && data[formKey] !== undefined) {
        formData.append(formKey, String(data[formKey]));
      }
    });

    // Adiciona as fotos existentes que foram mantidas
    currentPhotos.forEach(photo => {
        formData.append('fotos_keep[]', photo);
    });

    // Adiciona os novos arquivos de foto
    newPhotos.forEach(file => {
      formData.append('fotos[]', file);
    });

        setIsUploading(true);
    onSave(formData)
      .catch(() => {
        // O erro já é tratado na página principal, aqui apenas garantimos que o loading pare.
      })
      .finally(() => {
        setIsUploading(false);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {isUploading && (
          <div className="absolute inset-0 bg-white/80 z-10 flex flex-col items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-[#3EA76F]" />
            <p className="mt-4 text-lg font-semibold text-gray-700">Carregando fotos...</p>
          </div>
        )}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Editar Imóvel</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto p-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="tipo_imovel">Tipo de Imóvel</Label>
              <Controller
                name="tipo_imovel"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="mt-2"><SelectValue placeholder="Selecione o tipo" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Apartamento">Apartamento</SelectItem>
                      <SelectItem value="Casa">Casa</SelectItem>
                      <SelectItem value="Terreno">Terreno</SelectItem>
                      <SelectItem value="Comercial">Comercial</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div>
                <Label htmlFor="cep">CEP</Label>
                <Input id="cep" {...register('cep', { required: 'CEP é obrigatório' })} className="mt-2" />
                {errors.cep && <p className="text-red-500 text-sm mt-1">{errors.cep.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
                <Label htmlFor="cidade">Cidade</Label>
                <Input id="cidade" {...register('cidade', { required: 'Cidade é obrigatória' })} className="mt-2" />
                {errors.cidade && <p className="text-red-500 text-sm mt-1">{errors.cidade.message}</p>}
            </div>
             <div>
                <Label htmlFor="estado">Estado</Label>
                <Input id="estado" {...register('estado', { required: 'Estado é obrigatório' })} className="mt-2" />
                {errors.estado && <p className="text-red-500 text-sm mt-1">{errors.estado.message}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="endereco">Endereço</Label>
            <Input id="endereco" {...register('endereco', { required: 'Endereço é obrigatório' })} className="mt-2" />
            {errors.endereco && <p className="text-red-500 text-sm mt-1">{errors.endereco.message}</p>}
          </div>

          <div>
            <Label htmlFor="complemento">Complemento</Label>
            <Input id="complemento" {...register('complemento')} className="mt-2" />
          </div>

          <div>
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea id="descricao" {...register('descricao')} className="mt-2" rows={5} />
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Gerenciar Fotos</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {currentPhotos.map((photo, index) => (
                <div key={index} className="relative group">
                  <img src={photo} alt={`Foto ${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
                  <button 
                    type="button"
                    onClick={() => handlePhotoDelete(photo)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Label htmlFor="new_photos">Adicionar Novas Fotos</Label>
              <Input id="new_photos" type="file" multiple onChange={handleNewPhotoChange} className="mt-2" />
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Características</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <Label htmlFor="area">Área (m²)</Label>
                  <Input id="area" type="number" {...register('area', { required: true, valueAsNumber: true })} className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="quartos">Quartos</Label>
                  <Input id="quartos" type="number" {...register('quartos', { required: true, valueAsNumber: true })} className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="banheiros">Banheiros</Label>
                  <Input id="banheiros" type="number" {...register('banheiros', { required: true, valueAsNumber: true })} className="mt-2" />
                </div>
                {/* <div>
                  <Label htmlFor="garagem">Vagas Garagem</Label>
                  <Input id="garagem" type="number" {...register('garagem', { required: true, valueAsNumber: true })} className="mt-2" />
                </div> */}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Detalhes Financeiros</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <Label htmlFor="valor_agio">Valor do Ágio</Label>
                  <Input id="valor_agio" type="number" {...register('valor_agio', { required: true, valueAsNumber: true })} className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="valor_parcela_atual">Parcela Atual</Label>
                  <Input id="valor_parcela_atual" type="number" {...register('valor_parcela_atual', { required: true, valueAsNumber: true })} className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="parcelas_restantes">Parcelas Restantes</Label>
                  <Input id="parcelas_restantes" type="number" {...register('parcelas_restantes', { required: true, valueAsNumber: true })} className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="valor_total_financiado">Valor Total</Label>
                  <Input id="valor_total_financiado" type="number" {...register('valor_total_financiado', { required: true, valueAsNumber: true })} className="mt-2" />
                </div>
            </div>
          </div>

        </form>

        <div className="flex justify-end gap-4 p-6 bg-gray-50 border-t border-gray-200">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSubmit(onSubmit)} disabled={isUploading} className="bg-[#3EA76F] hover:bg-[#48C78E]">Salvar Alterações</Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
