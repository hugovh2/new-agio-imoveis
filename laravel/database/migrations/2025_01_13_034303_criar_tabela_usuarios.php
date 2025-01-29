<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CriarTabelaUsuarios extends Migration
{
    /**
     * Execute a migração.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id();  // ID do usuário
            $table->enum('tipo_usuario', ['cpf', 'cnpj']);  // Tipo de usuário (pessoa física ou jurídica)
            $table->string('email')->unique();  // E-mail do usuário
            $table->string('senha');  // Senha criptografada
            $table->string('cpf')->nullable();  // CPF, só para pessoa física
            $table->string('nome_completo')->nullable();  // Nome completo, só para pessoa física
            $table->date('data_nascimento')->nullable();  // Data de nascimento, só para pessoa física
            $table->string('cnpj')->nullable();  // CNPJ, só para pessoa jurídica
            $table->string('razao_social')->nullable();  // Razão social, só para pessoa jurídica
            $table->string('nome_fantasia')->nullable();  // Nome fantasia, só para pessoa jurídica
            $table->string('telefone')->nullable();  // Telefone, só para pessoa jurídica
            $table->boolean('termos_aceitos')->default(false);  // Aceite dos termos e condições
            $table->timestamps();  // Data de criação e atualização
        });
    }

    /**
     * Reverter a migração.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('usuarios');
    }
}
